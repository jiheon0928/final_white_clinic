// src/auth/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * 필요한 경우 추가 권한 검사 로직을 넣을 수 있음
   */
  canActivate(context: ExecutionContext) {
    // 예: 특정 role 체크 등
    return super.canActivate(context);
  }
}
