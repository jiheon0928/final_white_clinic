// src/auth/rogin.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryDriver } from 'src/registration/entities/registration.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './dto/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(DeliveryDriver)
    private readonly driverRepo: Repository<DeliveryDriver>,

    @InjectRepository(RefreshToken)
    private readonly rtRepo: Repository<RefreshToken>,

    private readonly jwtService: JwtService,
  ) {}

  /** 1) 기존 validate 로직 그대로 유지 */
  async validate(loginId: string, plainPass: string): Promise<DeliveryDriver> {
    const driver = await this.driverRepo.findOneBy({ loginId });
    if (!driver)
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸어');
    const ok = await bcrypt.compare(plainPass, driver.password);
    if (!ok) throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸어');
    return driver;
  }

  /** 2) 로그인 → 토큰 발급 + 리프레시 토큰 저장 */
  async login(loginId: string, plainPass: string) {
    const driver = await this.validate(loginId, plainPass);
    const payload = { sub: driver.id, loginId: driver.loginId };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    });

    // DB에 리프레시 토큰 저장 (revokedAt = null)
    await this.rtRepo.save(
      this.rtRepo.create({
        token: refreshToken,
        userId: driver.id,
        revokedAt: null,
      }),
    );

    return { accessToken, refreshToken, driver };
  }

  /** 3) 리프레시 토큰으로 액세스 토큰 재발급 */
  async refresh(refreshToken: string) {
    // 3-1) DB에서 토큰 조회 & 블랙리스트 확인
    const dbToken = await this.rtRepo.findOneBy({ token: refreshToken });
    if (!dbToken || dbToken.revokedAt) {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰이야');
    }

    // 3-2) JWT 검증
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_SECRET,
    });

    // 3-3) 새 액세스 토큰 발급
    const accessToken = this.jwtService.sign(
      { sub: payload.sub, loginId: payload.loginId },
      { expiresIn: '15m' },
    );
    return { accessToken };
  }

  /** 4) 로그아웃 → 리프레시 토큰 회수(블랙리스트 등록) */
  async logout(refreshToken: string) {
    await this.rtRepo.update(
      { token: refreshToken },
      { revokedAt: new Date() },
    );
  }
}
