import { Strategy, ExtractJwt } from 'passport-jwt';
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  /**
   * 유효한 JWT를 디코딩한 후 호출되는 메서드
   * @param payload - 토큰 페이로드(sub, loginId 등)
   * @returns 검증된 사용자 식별 정보
   */
  async validate(payload: any) {
    return { id: payload.sub, loginId: payload.loginId };
  }
}
