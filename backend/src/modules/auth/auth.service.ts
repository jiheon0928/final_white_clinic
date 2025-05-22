// src/auth/auth.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateDriverDto } from './dto/create-auth.dto';
import { TokenService } from './service/token.service';

import { DeliveryDriver } from './entites/auth.entity';
import { RefreshTokenService } from './service/refresh-token.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(DeliveryDriver)
    private readonly driverRepo: Repository<DeliveryDriver>,

    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  /** 회원가입 */
  async register(dto: CreateDriverDto): Promise<DeliveryDriver> {
    const exists = await this.driverRepo.findOneBy({ loginId: dto.loginId });
    if (exists) throw new ConflictException('이미 존재하는 loginId야');

    const hashed = await bcrypt.hash(dto.password, 10);
    const driver = this.driverRepo.create({ ...dto, password: hashed });
    return this.driverRepo.save(driver);
  }

  /** 로그인 검증 */
  private async validate(loginId: string, password: string) {
    const driver = await this.driverRepo.findOneBy({ loginId });
    if (!driver) throw new UnauthorizedException('아이디 또는 비밀번호 오류');
    const ok = await bcrypt.compare(password, driver.password);
    if (!ok) throw new UnauthorizedException('아이디 또는 비밀번호 오류');
    return driver;
  }

  /** 로그인 */
  async login(loginId: string, password: string) {
    const driver = await this.validate(loginId, password);
    const payload = { sub: driver.id, loginId: driver.loginId };

    const accessToken = this.tokenService.getAccessToken(payload);
    const refreshToken = this.tokenService.getRefreshToken(payload);

    // DB에 리프레시 토큰 저장
    await this.refreshTokenService.saveToken(driver.id, refreshToken);

    return { accessToken, refreshToken, user: driver };
  }

  /** 토큰 재발급 */
  async refresh(refreshToken: string) {
    const record = await this.refreshTokenService.validateToken(refreshToken);
    if (!record) throw new UnauthorizedException('유효하지 않은 리프레시 토큰');

    // refreshToken이 유효하면 accessToken만 재발급
    const payload = this.tokenService.verifyToken(refreshToken, true);
    const newAccessToken = this.tokenService.getAccessToken({
      sub: payload.sub,
      loginId: payload.loginId,
    });

    return { accessToken: newAccessToken };
  }

  /** 로그아웃 */
  async logout(refreshToken: string) {
    await this.refreshTokenService.revokeToken(refreshToken);
  }
}
