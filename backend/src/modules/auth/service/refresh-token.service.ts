// src/auth/refresh-token.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../dto/refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly rtRepo: Repository<RefreshToken>,
  ) {}

  /** 새 리프레시 토큰 저장 */
  async saveToken(userId: number, token: string): Promise<RefreshToken> {
    const entity = this.rtRepo.create({ userId, token, revokedAt: null });
    return this.rtRepo.save(entity);
  }

  /** 토큰 유효성 검사: 없거나 이미 폐기된 토큰이면 null 반환 */
  async validateToken(token: string): Promise<RefreshToken | null> {
    const found = await this.rtRepo.findOneBy({ token });
    if (!found || found.revokedAt) return null;
    return found;
  }

  /** 리프레시 토큰 폐기 */
  async revokeToken(token: string): Promise<void> {
    await this.rtRepo.update({ token }, { revokedAt: new Date() });
  }
}
