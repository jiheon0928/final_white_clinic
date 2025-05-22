// src/auth/token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  /** 액세스 토큰 발급 */
  getAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  /** 리프레시 토큰 발급 */
  getRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  /** 토큰 검증 (isRefresh=true면 REFRESH_SECRET 사용) */
  verifyToken(token: string, isRefresh = false): any {
    const secret = isRefresh
      ? process.env.REFRESH_SECRET
      : process.env.JWT_SECRET;
    return this.jwtService.verify(token, { secret });
  }
}
