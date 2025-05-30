// src/modules/auth/admin.service.ts
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

import { CreateAdminDto } from './dto/create-admin.dto';
import { TokenService } from '../auth/service/token.service';
import { RefreshTokenService } from '../auth/service/refresh-token.service';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  /** 관리자 회원가입 */
  async register(dto: CreateAdminDto): Promise<{
    admin: Omit<Admin, 'password'>;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      this.logger.log(`register(): loginId=${dto.loginId}`);
      const exists = await this.adminRepo.findOneBy({ loginId: dto.loginId });
      if (exists) throw new ConflictException('이미 존재하는 loginId야');

      // 1) 비번 해시
      const hashed = await bcrypt.hash(dto.password, 10);
      // 2) 엔티티 생성 & 저장
      const adminEntity = this.adminRepo.create({
        loginId: dto.loginId,
        password: hashed,
        role: 'admin', // 클라이언트가 role을 넘기지 않아도 무조건 admin
      });
      const saved = await this.adminRepo.save(adminEntity);

      // 3) 페이로드 구성
      const payload = {
        sub: saved.id,
        loginId: saved.loginId,
        role: saved.role,
      };
      // 4) 토큰 발급
      const accessToken = this.tokenService.getAccessToken(payload);
      const refreshToken = this.tokenService.getRefreshToken(payload);
      // 5) 리프레시 토큰 저장
      await this.refreshTokenService.saveToken(saved.id, refreshToken);

      // 6) 비밀번호 제외한 객체로 구조분해
      const { password: _, ...admin } = saved;

      return { admin, accessToken, refreshToken };
    } catch (e) {
      if (e instanceof ConflictException) throw e;
      this.logger.error('register(): 예기치 못한 오류', e.stack);
      throw new InternalServerErrorException('관리자 등록 중 오류');
    }
  }

  /** 로그인 검증 */
  private async validate(loginId: string, password: string): Promise<Admin> {
    const admin = await this.adminRepo.findOneBy({ loginId });
    if (!admin) throw new UnauthorizedException('아이디 또는 비번이 달라');
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) throw new UnauthorizedException('아이디 또는 비번이 달라');
    return admin;
  }

  /** 로그인 */
  async login(loginId: string, password: string) {
    const admin = await this.validate(loginId, password);
    const payload = { sub: admin.id, loginId: admin.loginId, role: admin.role };

    const accessToken = this.tokenService.getAccessToken(payload);
    const refreshToken = this.tokenService.getRefreshToken(payload);
    await this.refreshTokenService.saveToken(admin.id, refreshToken);

    const { password: _, ...rest } = admin;
    return { accessToken, refreshToken, admin: rest };
  }

  /** 토큰 재발급 */
  async refresh(refreshToken: string) {
    const record = await this.refreshTokenService.validateToken(refreshToken);
    if (!record) throw new UnauthorizedException('유효하지 않은 리프레시 토큰');
    const payload = this.tokenService.verifyToken(refreshToken, true);
    return {
      accessToken: this.tokenService.getAccessToken({
        sub: payload.sub,
        loginId: payload.loginId,
        role: payload.role,
      }),
    };
  }

  /** 로그아웃 */
  async logout(refreshToken: string) {
    await this.refreshTokenService.revokeToken(refreshToken);
  }
}
