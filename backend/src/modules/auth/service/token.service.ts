// src/auth/token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  /** 액세스 토큰 발급 */
  getAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: '111',
      expiresIn: '1d',
    });
  }

  /** 리프레시 토큰 발급 */
  getRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: '111',
      expiresIn: '7d',
    });
  }

  /** 토큰 검증 (isRefresh=true면 REFRESH_SECRET 사용) */
  verifyToken(token: string, isRefresh = false): any {
    const secret = isRefresh ? '111' : '111';
    return this.jwtService.verify(token, { secret });
  }
}
