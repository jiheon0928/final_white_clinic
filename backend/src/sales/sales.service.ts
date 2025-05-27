import { Injectable, Param } from '@nestjs/common';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  //========================오늘 매출 조회========================
  async todaySales(@Param() reservation: Reservation) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(todayStart.getDate() + 1);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price), 0)', 'totalPrice')
      .where('r.createdAt BETWEEN :start AND :end', {
        start: todayStart,
        end: tomorrowStart,
      })
      .andWhere('s.status = :status', { status: '완료' })
      .getRawOne<{ totalPrice: string }>();

    const total = parseFloat(raw?.totalPrice ?? '0');
    return { todaySales: total };
  }
}
