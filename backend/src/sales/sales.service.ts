import { Injectable } from '@nestjs/common';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  //========================선택 일수 매출 조회========================
  async getSalesByDate(date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .innerJoin('r.driver', 'd')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * d.benefit), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - d.benefit)), 0)', 'netProfit')
      .where('r.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('s.status = :status', { status: '완료' })
      .getRawOne<{
        totalSales: string;
        totalCommission: string;
        netProfit: string;
      }>();

    return {
      totalSales: parseFloat(raw?.totalSales ?? '0'),
      totalCommission: parseFloat(raw?.totalCommission ?? '0'),
      netProfit: parseFloat(raw?.netProfit ?? '0'),
    };
  }

  //========================주간 매출 조회========================
  async getWeeklySales(refDate: Date): Promise<{
    totalSales: number;
    totalCommission: number;
    netProfit: number;
  }> {
    // refDate가 속한 주의 월요일 00:00부터, 다음 주 월요일 00:00까지
    const day = refDate.getDay(); // 일=0, 월=1, … 토=6
    const diffToMon = (day + 6) % 7; // 월요일로 이동
    const weekStart = new Date(refDate);
    weekStart.setDate(refDate.getDate() - diffToMon);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    weekEnd.setHours(0, 0, 0, 0);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .innerJoin('r.driver', 'd')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price),          0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * d.benefit), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - d.benefit)), 0)', 'netProfit')
      .where('r.createdAt BETWEEN :start AND :end', {
        start: weekStart,
        end: weekEnd,
      })
      .andWhere('s.status = :status', { status: '완료' })
      .getRawOne<{
        totalSales: string;
        totalCommission: string;
        netProfit: string;
      }>();

    return {
      totalSales: parseFloat(raw?.totalSales ?? '0'),
      totalCommission: parseFloat(raw?.totalCommission ?? '0'),
      netProfit: parseFloat(raw?.netProfit ?? '0'),
    };
  }

  //========================월간 매출 조회========================

  async getMonthlySales(refDate: Date): Promise<{
    totalSales: number;
    totalCommission: number;
    netProfit: number;
  }> {
    const start = new Date(refDate);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .innerJoin('r.driver', 'd')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * d.benefit), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - d.benefit)), 0)', 'netProfit')
      .where('r.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('s.status = :status', { status: '완료' })
      .getRawOne<{
        totalSales: string;
        totalCommission: string;
        netProfit: string;
      }>();

    return {
      totalSales: parseFloat(raw?.totalSales ?? '0'),
      totalCommission: parseFloat(raw?.totalCommission ?? '0'),
      netProfit: parseFloat(raw?.netProfit ?? '0'),
    };
  }

  //========================기간별 매출 조회========================
  async getRangeSales(
    start: Date,
    end: Date,
  ): Promise<{
    totalSales: number;
    totalCommission: number;
    netProfit: number;
  }> {
    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .innerJoin('r.driver', 'd')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * d.benefit), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - d.benefit)), 0)', 'netProfit')
      .where('r.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('s.status = :status', { status: '완료' })
      .getRawOne<{
        totalSales: string;
        totalCommission: string;
        netProfit: string;
      }>();

    return {
      totalSales: parseFloat(raw?.totalSales ?? '0'),
      totalCommission: parseFloat(raw?.totalCommission ?? '0'),
      netProfit: parseFloat(raw?.netProfit ?? '0'),
    };
  }
}
