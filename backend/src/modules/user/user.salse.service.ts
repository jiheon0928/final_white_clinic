import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSalesService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  // =============================주간 조회============================
  async getWeeklyByDate(
    riderId: number,
    refDate: Date,
  ): Promise<{ totalSales: number; netProfit: number }> {
    // 이번 주 월요일 00:00
    const d = refDate.getDay();
    const diff = d === 0 ? -6 : 1 - d;
    const mon = new Date(refDate);
    mon.setDate(refDate.getDate() + diff);
    mon.setHours(0, 0, 0, 0);

    // 이번 주 일요일 23:59:59
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    sun.setHours(23, 59, 59, 999);

    // aggregate 쿼리
    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect(
        'COALESCE(SUM(r.price * COALESCE(b.benefitType, 0)), 0)',
        'netProfit',
      )
      .where('r.riderId = :riderId', { riderId })
      .andWhere('r.visitTime >= :start AND r.visitTime <= :end', {
        start: mon.toISOString(),
        end: sun.toISOString(),
      })
      .andWhere('r.StatusId = :stateId', { stateId: 3 }) // 완료 상태만
      .getRawOne<{ totalSales: string; netProfit: string }>();

    return {
      totalSales: parseFloat(raw?.totalSales || '0'),
      netProfit: parseFloat(raw?.netProfit || '0'),
    };
  }

  // ============================= 월간 조회 =============================
  async getMonthlyByDate(
    riderId: number,
    refDate: Date,
  ): Promise<{ totalSales: number; netProfit: number }> {
    const year = refDate.getFullYear();
    const month = refDate.getMonth(); // 0-11
    const start = new Date(year, month, 1, 0, 0, 0, 0);
    const end = new Date(year, month + 1, 1, 0, 0, 0, 0);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect(
        'COALESCE(SUM(r.price * COALESCE(b.benefitType, 0)), 0)',
        'netProfit',
      )
      .where('r.riderId = :riderId', { riderId })
      .andWhere('r.visitTime >= :start AND r.visitTime < :end', {
        start: start.toISOString(),
        end: end.toISOString(),
      })
      .andWhere('r.StatusId = :stateId', { stateId: 3 })
      .getRawOne<{ totalSales: string; netProfit: string }>();

    return {
      totalSales: parseFloat(raw?.totalSales || '0'),
      netProfit: parseFloat(raw?.netProfit || '0'),
    };
  }

  // ============================= 연별 조회 =============================
  async getYearlyByYear(
    riderId: number,
    year: number,
  ): Promise<{ totalSales: number; netProfit: number }> {
    const start = new Date(year, 0, 1, 0, 0, 0, 0);
    const end = new Date(year + 1, 0, 1, 0, 0, 0, 0);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect(
        'COALESCE(SUM(r.price * COALESCE(b.benefitType, 0)), 0)',
        'netProfit',
      )
      .where('r.riderId = :riderId', { riderId })
      .andWhere('r.visitTime >= :start AND r.visitTime < :end', {
        start: start.toISOString(),
        end: end.toISOString(),
      })
      .andWhere('r.StatusId = :stateId', { stateId: 3 })
      .getRawOne<{ totalSales: string; netProfit: string }>();

    return {
      totalSales: parseFloat(raw?.totalSales || '0'),
      netProfit: parseFloat(raw?.netProfit || '0'),
    };
  }

  // 연도별 월간 매출 + 커미션 조회 ( riderId 추가 )
  async getMonthlySalesByYearAndRider(
    riderId: number,
    year: number,
  ): Promise<{ month: number; totalSales: number; totalCommission: number }[]> {
    const start = new Date(year, 0, 1, 0, 0, 0);
    const end = new Date(year + 1, 0, 1, 0, 0, 0);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .select('MONTH(r.visitTime)', 'month')
      .addSelect('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect(
        'COALESCE(SUM(r.price * COALESCE(b.benefitType, 0)), 0)',
        'totalCommission',
      )
      .where('r.riderId = :riderId', { riderId })
      .andWhere('r.visitTime >= :start AND r.visitTime < :end', { start, end })
      .andWhere('r.StatusId = :stateId', { stateId: 3 })
      .groupBy('MONTH(r.visitTime)')
      .orderBy('MONTH(r.visitTime)')
      .getRawMany<{
        month: string;
        totalSales: string;
        totalCommission: string;
      }>();

    const result = Array.from({ length: 12 }, (_, i) => {
      const m = i + 1;
      const item = raw.find((r) => parseInt(r.month, 10) === m);
      return {
        month: m,
        totalSales: item ? parseFloat(item.totalSales) : 0,
        totalCommission: item ? parseFloat(item.totalCommission) : 0,
      };
    });

    return result;
  }

  // 연도별 주차별 매출 조회 ( riderId 추가 )
  async getWeeklySalesByYearAndRider(
    riderId: number,
    year: number,
  ): Promise<{ month: number; week: number; totalSales: number }[]> {
    const start = new Date(year, 0, 1, 0, 0, 0);
    const end = new Date(year + 1, 0, 1, 0, 0, 0);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .select('MONTH(r.visitTime)', 'month')
      .addSelect('FLOOR((DAY(r.visitTime) - 1) / 7) + 1', 'week')
      .addSelect('COALESCE(SUM(r.price), 0)', 'totalSales')
      .where('r.riderId = :riderId', { riderId })
      .andWhere('r.visitTime >= :start AND r.visitTime < :end', { start, end })
      .andWhere('r.StatusId = :stateId', { stateId: 3 })
      .groupBy('MONTH(r.visitTime)')
      .addGroupBy('FLOOR((DAY(r.visitTime) - 1) / 7) + 1')
      .orderBy('MONTH(r.visitTime)', 'ASC')
      .addOrderBy('week', 'ASC')
      .getRawMany<{
        month: string;
        week: string;
        totalSales: string;
      }>();

    return raw.map((r) => ({
      month: parseInt(r.month, 10),
      week: parseInt(r.week, 10),
      totalSales: parseFloat(r.totalSales),
    }));
  }
}
