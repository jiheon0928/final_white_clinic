// src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  async login(
    loginId: string,
    password: string,
  ): Promise<{ loginId: string; password: string }> {
    // 실제 검증 로직 없이 그대로 리턴
    return { loginId, password };
  }
}
