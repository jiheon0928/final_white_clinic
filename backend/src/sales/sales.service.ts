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

  // 1) 특정 날짜 매출 조회
  async getSalesByDate(date: Date): Promise<{
    totalSales: number;
    driverCommission: number;
    netProfit: number;
  }> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    end.setHours(0, 0, 0, 0);

    const totalSalesExpr = 'COALESCE(SUM(r.price), 0)';
    const commissionExpr =
      'COALESCE(SUM(r.price * COALESCE(b.benefitType, 0)), 0)';
    const profitExpr = `${totalSalesExpr} - ${commissionExpr}`;

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .innerJoin('r.status', 's')
      .select(totalSalesExpr, 'totalSales')
      .addSelect(commissionExpr, 'driverCommission')
      .addSelect(profitExpr, 'netProfit')
      .where('r.visitTime >= :start AND r.visitTime < :end', { start, end })
      .andWhere('s.id = :stateId', { stateId: 3 })
      .getRawOne<{
        totalSales: string;
        driverCommission: string;
        netProfit: string;
      }>();

    const debugRows = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .innerJoin('r.status', 's')
      .select(['r.price    AS price', 'b.benefitType AS benefitType'])
      .where('r.visitTime >= :start AND r.visitTime < :end', { start, end })
      .andWhere('s.id = :stateId', { stateId: 3 })
      .getRawMany();

    console.log('▶ Debug Rows:', debugRows);
    return {
      totalSales: parseFloat(raw?.totalSales || '0'),
      driverCommission: parseFloat(raw?.driverCommission || '0'),
      netProfit: parseFloat(raw?.netProfit || '0'),
    };
  }

  //요번달 매출 조회
  async getMonthlySales(): Promise<{
    totalSales: number;
    totalCommission: number;
    netProfit: number;
  }> {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);
    end.setHours(0, 0, 0, 0);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * b.benefitType), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - b.benefitType)), 0)', 'netProfit')
      .where('r.visitTime >= :start AND r.visitTime < :end', { start, end })
      .andWhere('s.id = :stateId', { stateId: 3 })
      .getRawOne<{
        totalSales: string;
        totalCommission: string;
        netProfit: string;
      }>();

    return {
      totalSales: parseFloat(raw?.totalSales || '0'),
      totalCommission: parseFloat(raw?.totalCommission || '0'),
      netProfit: parseFloat(raw?.netProfit || '0'),
    };
  }

  // 2) 주간 통합 매출 요약
  async getWeeklySalesAggregate(refDate: Date): Promise<{
    totalSales: number;
    totalCommission: number;
    netProfit: number;
  }> {
    // 이번 주 월요일 00:00 ~ 다음 주 월요일 00:00
    const start = new Date(refDate);
    const day = start.getDay();
    const diffToMon = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diffToMon);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    end.setHours(0, 0, 0, 0);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .innerJoin('r.status', 's')
      .select('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * b.benefitType), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - b.benefitType)), 0)', 'netProfit')
      .where('r.visitTime >= :start AND r.visitTime < :end', { start, end })
      .andWhere('s.id = :stateId', { stateId: 3 })
      .getRawOne<{
        totalSales: string;
        totalCommission: string;
        netProfit: string;
      }>();

    return {
      totalSales: parseFloat(raw?.totalSales || '0'),
      totalCommission: parseFloat(raw?.totalCommission || '0'),
      netProfit: parseFloat(raw?.netProfit || '0'),
    };
  }

  //==========================주간 요일별 매출 조회==========================

  async getWeeklySalesByDay(refDate: Date): Promise<
    {
      date: string;
      totalSales: number;
      totalCommission: number;
      netProfit: number;
    }[]
  > {
    // 1. 기준일로부터 이번 주 월요일 00:00:00 설정
    const start = new Date(refDate);
    const day = start.getDay();
    const diffToMon = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diffToMon);
    start.setHours(0, 0, 0, 0);

    // 2. 다음 주 월요일 00:00:00 설정
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    end.setHours(0, 0, 0, 0);

    // 3. visitTime 기준으로 쿼리 실행
    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .innerJoin('r.status', 's')
      // visitTime 기준으로 날짜 뽑기
      .select('DATE(r.visitTime)', 'date')
      .addSelect('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * b.benefitType), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - b.benefitType)), 0)', 'netProfit')
      // visitTime으로 필터
      .where('r.visitTime >= :start AND r.visitTime < :end', { start, end })
      .andWhere('s.id = :stateId', { stateId: 3 })
      .groupBy('DATE(r.visitTime)')
      .orderBy('DATE(r.visitTime)')
      .getRawMany();

    // 4. 숫자 타입으로 변환해서 리턴
    return raw.map((item) => ({
      date: item.date,
      totalSales: parseFloat(item.totalSales),
      totalCommission: parseFloat(item.totalCommission),
      netProfit: parseFloat(item.netProfit),
    }));
  }

  //========================년도별 월별 매출 조회========================
  async getMonthlySalesByYear(year: number): Promise<
    {
      month: number;
      totalSales: number;
      totalCommission: number;
      netProfit: number;
    }[]
  > {
    const start = new Date(year, 0, 1, 0, 0, 0);
    const end = new Date(year + 1, 0, 1, 0, 0, 0);

    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .innerJoin('r.status', 's')
      .select('MONTH(r.visitTime)', 'month')
      .addSelect('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * b.benefitType), 0)', 'totalCommission')
      .addSelect('COALESCE(SUM(r.price * (1 - b.benefitType)), 0)', 'netProfit')
      .where('r.visitTime >= :start AND r.visitTime < :end', { start, end })
      .andWhere('s.id = :stateId', { stateId: 3 }) // 완료 상태만
      .groupBy('MONTH(r.visitTime)')
      .orderBy('MONTH(r.visitTime)')
      .getRawMany<{
        month: string;
        totalSales: string;
        totalCommission: string;
        netProfit: string;
      }>();

    const result = Array.from({ length: 12 }, (_, i) => {
      const m = i + 1;
      const item = raw.find((r) => parseInt(r.month, 10) === m);
      return {
        month: m,
        totalSales: item ? parseFloat(item.totalSales) : 0,
        totalCommission: item ? parseFloat(item.totalCommission) : 0,
        netProfit: item ? parseFloat(item.netProfit) : 0,
      };
    });

    return result;
  }

  // 새로 추가한 주차별 집계 메서드
  async getWeeklySalesByYear(
    year: number,
  ): Promise<
    { month: number; week: number; totalSales: number; netProfit: number }[]
  > {
    const start = new Date(year, 0, 1, 0, 0, 0);
    const end = new Date(year + 1, 0, 1, 0, 0, 0);

    // 주차 계산 로직: (DAY(r.visitTime)-1)/7 을 내림한 후 +1
    const raw = await this.reservationRepository
      .createQueryBuilder('r')
      .leftJoin('r.rider', 'd')
      .leftJoin('d.benefit', 'b')
      .innerJoin('r.status', 's')
      .select('MONTH(r.visitTime)', 'month')
      .addSelect('FLOOR((DAY(r.visitTime) - 1) / 7) + 1', 'week')
      .addSelect('COALESCE(SUM(r.price), 0)', 'totalSales')
      .addSelect('COALESCE(SUM(r.price * (1 - b.benefitType)), 0)', 'netProfit')
      .where('r.visitTime >= :start AND r.visitTime < :end', { start, end })
      .andWhere('s.id = :stateId', { stateId: 3 }) // 완료 상태만
      .groupBy('MONTH(r.visitTime)')
      .addGroupBy('FLOOR((DAY(r.visitTime) - 1) / 7) + 1')
      .orderBy('MONTH(r.visitTime)', 'ASC')
      .addOrderBy('week', 'ASC')
      .getRawMany<{
        month: string;
        week: string;
        totalSales: string;
        netProfit: string;
      }>();

    // 결과를 숫자 타입으로 변환해서 반환
    return raw.map((r) => ({
      month: parseInt(r.month, 10),
      week: parseInt(r.week, 10),
      totalSales: parseFloat(r.totalSales),
      netProfit: parseFloat(r.netProfit),
    }));
  }
}
