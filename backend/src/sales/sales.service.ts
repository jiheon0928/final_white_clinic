import { ReservationService } from './../reservation/reservation.service';
import { Get, Injectable, Query } from '@nestjs/common';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly reservationService: ReservationService,
  ) {}

  //========================선택 일수 매출 조회========================
  async getSalesByDate(date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .innerJoin('r.rider', 'd')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * d.benefit), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - d.benefit)), 0)', 'netProfit')
      .where('r.date BETWEEN :start AND :end', { start, end })
      .andWhere('s.status = :status', { status: 3 })
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
      .innerJoin('r.rider', 'd')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price),          0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * d.benefit), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - d.benefit)), 0)', 'netProfit')
      .where('r.date BETWEEN :start AND :end', {
        start: weekStart,
        end: weekEnd,
      })
      .andWhere('s.status = :status', { status: 3 })
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
      .innerJoin('r.rider', 'd')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * d.benefit), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - d.benefit)), 0)', 'netProfit')
      .where('r.date BETWEEN :start AND :end', { start, end })
      .andWhere('s.status = :status', { status: 3 })
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
      .innerJoin('r.rider', 'd')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * d.benefit), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - d.benefit)), 0)', 'netProfit')
      .where('r.date BETWEEN :start AND :end', { start, end })
      .andWhere('s.status = :status', { status: 3 })
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

  //==========================주간 요일별 매출 조회==========================

  async getWeeklySalesByDay(refDate: Date): Promise<
    Array<{
      date: string;
      totalSales: number;
      totalCommission: number;
      netProfit: number;
    }>
  > {
    // 주 시작(일요일)과 다음 주 시작 계산
    const start = new Date(refDate);
    start.setDate(refDate.getDate() - refDate.getDay());
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    end.setHours(0, 0, 0, 0);

    // 쿼리: 날짜별로 그룹핑, "완료" 상태(id=3)만 합산
    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .innerJoin('r.rider', 'd')
      .innerJoin('r.status', 's')
      .select('r.date', 'date')
      .addSelect('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * d.benefit), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - d.benefit)), 0)', 'netProfit')
      .where('r.date BETWEEN :start AND :end', { start, end })
      .andWhere('s.status = :status', { status: 3 })
      .groupBy('r.date')
      .getRawMany<{
        date: string;
        totalSales: string;
        totalCommission: string;
        netProfit: string;
      }>();

    return raw.map((item) => ({
      date: item.date,
      totalSales: parseFloat(item.totalSales),
      totalCommission: parseFloat(item.totalCommission),
      netProfit: parseFloat(item.netProfit),
    }));
  }
}
