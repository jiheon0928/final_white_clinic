// src/modules/auth/auth.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateDriverDto } from './dto/create-auth.dto';
import { TokenService } from './service/token.service';
import { RefreshTokenService } from './service/refresh-token.service';
import { DeliveryDriver } from './entites/auth.entity';
import { Benefit } from 'src/reservation/entities/benefit.entity';
import { Industry } from 'src/reservation/entities/industry.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(DeliveryDriver)
    private readonly driverRepo: Repository<DeliveryDriver>,

    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  /** 회원가입 */
  async register(dto: CreateDriverDto): Promise<DeliveryDriver> {
    try {
      this.logger.log(`register(): loginId=${dto.loginId}`);
      const exists = await this.driverRepo.findOneBy({ loginId: dto.loginId });
      if (exists) {
        this.logger.warn(`register(): 이미 존재하는 loginId=${dto.loginId}`);
        throw new ConflictException('이미 존재하는 loginId입니다.');
      }

      const hashed = await bcrypt.hash(dto.password, 10);

      // benefitId, industryIds 분리
      const { benefitId, industryIds, approval, ...data } = dto;

      // 기본 driver 생성 (relation 필드는 나중에 매핑)
      const driver = this.driverRepo.create({
        ...data,
        password: hashed,
        approval: approval ?? false,
      });

      // Benefit 매핑
      if (benefitId) {
        driver.benefitId = { id: benefitId } as Benefit;
      }

      // Industry 매핑
      if (industryIds && industryIds.length) {
        driver.industryIds = industryIds.map((id) => ({ id }) as Industry);
      }

      return await this.driverRepo.save(driver);
    } catch (e) {
      if (e instanceof ConflictException) throw e;
      this.logger.error('register(): 예기치 못한 오류', e.stack);
      throw new InternalServerErrorException(
        '회원가입 중 오류가 발생했습니다.',
      );
    }
  }

  /** 로그인 검증 (내부용) */
  private async validate(
    loginId: string,
    password: string,
  ): Promise<DeliveryDriver> {
    try {
      this.logger.log(`validate(): loginId=${loginId}`);
      const driver = await this.driverRepo.findOneBy({ loginId });
      if (!driver) {
        this.logger.warn(`validate(): 유저 없음 loginId=${loginId}`);
        throw new UnauthorizedException(
          '아이디 또는 비밀번호가 올바르지 않습니다.',
        );
      }
      const ok = await bcrypt.compare(password, driver.password);
      if (!ok) {
        this.logger.warn(`validate(): 비밀번호 불일치 loginId=${loginId}`);
        throw new UnauthorizedException(
          '아이디 또는 비밀번호가 올바르지 않습니다.',
        );
      }

      if (!driver.approval) {
        this.logger.warn(`validate(): 승인 대기 중 loginId=${loginId}`);
        throw new UnauthorizedException('승인된 계정만 로그인할 수 있습니다.');
      }

      return driver;
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      this.logger.error('validate(): 예기치 못한 오류', e.stack);
      throw new InternalServerErrorException(
        '로그인 검증 중 오류가 발생했습니다.',
      );
    }
  }

  /** 로그인 */
  async login(loginId: string, password: string) {
    try {
      this.logger.log(`login(): loginId=${loginId}`);
      const driver = await this.validate(loginId, password);
      const payload = { sub: driver.id, loginId: driver.loginId };

      const accessToken = this.tokenService.getAccessToken(payload);
      const refreshToken = this.tokenService.getRefreshToken(payload);

      this.logger.log(`login(): saving refreshToken for driverId=${driver.id}`);
      await this.refreshTokenService.saveToken(driver.id, refreshToken);

      const { password: pw, ...user } = driver;

      return { accessToken, refreshToken, user };
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      this.logger.error('login(): 예기치 못한 오류', e.stack);
      throw new InternalServerErrorException(
        `로그인 중 오류가 발생했습니다: ${e.message}`,
      );
    }
  }

  /** 토큰 재발급 */
  async refresh(refreshToken: string) {
    try {
      this.logger.log(`refresh(): token=${refreshToken}`);
      const record = await this.refreshTokenService.validateToken(refreshToken);
      if (!record) {
        this.logger.warn('refresh(): 유효하지 않은 리프레시 토큰');
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
      }

      const payload = this.tokenService.verifyToken(refreshToken, true);
      const newAccessToken = this.tokenService.getAccessToken({
        sub: payload.sub,
        loginId: payload.loginId,
      });

      return { accessToken: newAccessToken };
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      this.logger.error('refresh(): 예기치 못한 오류', e.stack);
      throw new InternalServerErrorException(
        '토큰 재발급 중 오류가 발생했습니다.',
      );
    }
  }

  /** 로그아웃 */
  async logout(refreshToken: string) {
    try {
      this.logger.log(`logout(): token=${refreshToken}`);
      await this.refreshTokenService.revokeToken(refreshToken);
    } catch (e) {
      this.logger.error('logout(): 예기치 못한 오류', e.stack);
      throw new InternalServerErrorException(
        '로그아웃 중 오류가 발생했습니다.',
      );
    }
  }
}
