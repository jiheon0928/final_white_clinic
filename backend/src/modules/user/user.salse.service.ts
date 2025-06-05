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
  ): Promise<{
    totalSales: Record<string, number>;
    totalCommission: Record<string, number>;
  }> {
    // 1) 이번 주 월요일 00:00, 일요일 23:59:59 계산
    const d = refDate.getDay(); // 0=일, 1=월, ..., 6=토
    const diffToMon = d === 0 ? -6 : 1 - d;
    const mon = new Date(refDate);
    mon.setDate(refDate.getDate() + diffToMon);
    mon.setHours(0, 0, 0, 0);
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    sun.setHours(23, 59, 59, 999);

    // 2) DATE(r.visitTime) 기준으로 그룹핑해서 요일별 집계 (Raw)
    const rawStats = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .select('DATE(r.visitTime)', 'date')
      .addSelect('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect(
        'COALESCE(SUM(r.price * COALESCE(b.benefitType, 0)), 0)',
        'netProfit',
      )
      .where('r.riderId = :riderId', { riderId })
      .andWhere('r.visitTime BETWEEN :start AND :end', {
        start: mon.toISOString(),
        end: sun.toISOString(),
      })
      .andWhere('r.StatusId = :stateId', { stateId: 3 }) // 완료 상태만
      .groupBy('DATE(r.visitTime)')
      .orderBy('DATE(r.visitTime)', 'ASC')
      .getRawMany<{ date: string; totalSales: string; netProfit: string }>();

    // 3) 요일 이름 배열
    const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

    // 4) 빈 매핑 객체 초기화
    const salesByDay: Record<string, number> = {};
    const commissionByDay: Record<string, number> = {};
    WEEK_DAYS.forEach((wd) => {
      salesByDay[wd] = 0;
      commissionByDay[wd] = 0;
    });

    // 5) rawStats를 순회하며 해당 날짜의 요일에 값 채우기
    rawStats.forEach((r) => {
      const yyyyMmDd = r.date; // 예: '2025-06-03'
      const dayIdx = new Date(yyyyMmDd).getDay(); // 0~6
      const dayName = WEEK_DAYS[dayIdx];
      salesByDay[dayName] = parseFloat(r.totalSales);
      commissionByDay[dayName] = parseFloat(r.netProfit);
    });

    // 6) 최종 리턴
    return {
      totalSales: salesByDay,
      totalCommission: commissionByDay,
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
