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
      .select('SUM(r.price)', 'totalPrice')
      .where('r.date BETWEEN :start AND :end', {
        start: todayStart.toISOString(),
        end: tomorrowStart.toISOString(),
      })
      .andWhere('s.status = :status', { status: '완료' })
      .getRawOne();
  }
}
