import { CompleteState } from './entities/compliteState.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-list.dto';
import { DeliveryDriver } from 'src/modules/auth/entites/auth.entity';

import { UpdateReservationDto } from './dto/update-list.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(CompleteState)
    private readonly statusRepository: Repository<CompleteState>,
    @InjectRepository(CompleteState)
    private readonly compliteStateRepository: Repository<CompleteState>,
  ) {}

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const defaultValue = await this.compliteStateRepository.findOneBy({
      id: 1,
    });
    const defaultState = await this.statusRepository.findOneBy({
      status: defaultValue?.status,
    });

    const { industryId, ...rest } = dto;

    const entity = this.reservationRepository.create({
      ...rest,
      industry: { id: industryId },
      status: defaultState!,
    });

    return this.reservationRepository.save(entity);
  }

  // ============================= 상태 조회============================
  async findByStatus(status: '대기' | '진행' | '완료'): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: {
        status: { status }, // CompleteState.status 컬럼
      },
      relations: ['rider', 'industry', 'status'],
    });
  }

  // ============================= 예약 정보 수정 ============================
  async listupdate(id: number, dto: UpdateReservationDto) {
    await this.reservationRepository.update(id, dto);
    return this.reservationRepository.findOne({
      where: { id },
      relations: ['rider', 'industry', 'status'],
    });
  }

  // =============================id로 조회============================
  async findById(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['rider', 'industry', 'status'],
    });
    if (!reservation) throw new NotFoundException('해당 예약이 없습니다.');
    return reservation;
  }

  // =============================기사 픽업 로직============================
  async pickup(reservationId: number, riderId: number) {
    const IN_PROGRESS_STATE_ID = 2;

    const result = await this.reservationRepository.update(reservationId, {
      rider: { id: riderId } as DeliveryDriver,
      status: { id: IN_PROGRESS_STATE_ID } as CompleteState,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `id ${reservationId} 예약을 찾을 수 없습니다.`,
      );
    }

    return { message: '픽업 완료!' };
  }

  // =============================일거리 완료 로직============================
  async complete(reservationId: number, riderId: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['rider', 'industry', 'status'],
    });
    if (!reservation) throw new NotFoundException('해당 예약이 없습니다.');

    if (!reservation.rider || reservation.rider.id !== riderId) {
      throw new ForbiddenException('본인이 픽업한 예약만 완료할 수 있습니다.');
    }

    const done = await this.compliteStateRepository.findOneBy({
      status: '완료',
    });
    if (!done) throw new NotFoundException('완료 상태가 없습니다.');

    reservation.status = done;
    return this.reservationRepository.save(reservation);
  }

  // // =============================주간 조회============================
  // async getWeeklyByDate(
  //   riderId: number,
  //   refDate: Date,
  // ): Promise<{ totalSales: number; netProfit: number }> {
  //   // 이번 주 월요일 00:00
  //   const d = refDate.getDay();
  //   const diff = d === 0 ? -6 : 1 - d;
  //   const mon = new Date(refDate);
  //   mon.setDate(refDate.getDate() + diff);
  //   mon.setHours(0, 0, 0, 0);

  //   // 이번 주 일요일 23:59:59
  //   const sun = new Date(mon);
  //   sun.setDate(mon.getDate() + 6);
  //   sun.setHours(23, 59, 59, 999);

  //   // aggregate 쿼리
  //   const raw = await this.reservationRepository
  //     .createQueryBuilder('r')
  //     .leftJoin('r.rider', 'd')
  //     .leftJoin('d.benefit', 'b')
  //     .select('COALESCE(SUM(r.price), 0)', 'totalSales')
  //     .addSelect(
  //       'COALESCE(SUM(r.price * COALESCE(b.benefitType, 0)), 0)',
  //       'netProfit',
  //     )
  //     .where('r.riderId = :riderId', { riderId })
  //     .andWhere('r.visitTime >= :start AND r.visitTime <= :end', {
  //       start: mon.toISOString(),
  //       end: sun.toISOString(),
  //     })
  //     .andWhere('r.StatusId = :stateId', { stateId: 3 }) // 완료 상태만
  //     .getRawOne<{ totalSales: string; netProfit: string }>();

  //   return {
  //     totalSales: parseFloat(raw?.totalSales || '0'),
  //     netProfit: parseFloat(raw?.netProfit || '0'),
  //   };
  // }

  // // ============================= 월간 조회 =============================
  // async getMonthlyByDate(
  //   riderId: number,
  //   refDate: Date,
  // ): Promise<{ totalSales: number; netProfit: number }> {
  //   const year = refDate.getFullYear();
  //   const month = refDate.getMonth(); // 0-11
  //   const start = new Date(year, month, 1, 0, 0, 0, 0);
  //   const end = new Date(year, month + 1, 1, 0, 0, 0, 0);

  //   const raw = await this.reservationRepository
  //     .createQueryBuilder('r')
  //     .leftJoin('r.rider', 'd')
  //     .leftJoin('d.benefit', 'b')
  //     .select('COALESCE(SUM(r.price), 0)', 'totalSales')
  //     .addSelect(
  //       'COALESCE(SUM(r.price * COALESCE(b.benefitType, 0)), 0)',
  //       'netProfit',
  //     )
  //     .where('r.riderId = :riderId', { riderId })
  //     .andWhere('r.visitTime >= :start AND r.visitTime < :end', {
  //       start: start.toISOString(),
  //       end: end.toISOString(),
  //     })
  //     .andWhere('r.StatusId = :stateId', { stateId: 3 })
  //     .getRawOne<{ totalSales: string; netProfit: string }>();

  //   return {
  //     totalSales: parseFloat(raw?.totalSales || '0'),
  //     netProfit: parseFloat(raw?.netProfit || '0'),
  //   };
  // }

  // // ============================= 연별 조회 =============================
  // async getYearlyByYear(
  //   riderId: number,
  //   year: number,
  // ): Promise<{ totalSales: number; netProfit: number }> {
  //   const start = new Date(year, 0, 1, 0, 0, 0, 0);
  //   const end = new Date(year + 1, 0, 1, 0, 0, 0, 0);

  //   const raw = await this.reservationRepository
  //     .createQueryBuilder('r')
  //     .leftJoin('r.rider', 'd')
  //     .leftJoin('d.benefit', 'b')
  //     .select('COALESCE(SUM(r.price), 0)', 'totalSales')
  //     .addSelect(
  //       'COALESCE(SUM(r.price * COALESCE(b.benefitType, 0)), 0)',
  //       'netProfit',
  //     )
  //     .where('r.riderId = :riderId', { riderId })
  //     .andWhere('r.visitTime >= :start AND r.visitTime < :end', {
  //       start: start.toISOString(),
  //       end: end.toISOString(),
  //     })
  //     .andWhere('r.StatusId = :stateId', { stateId: 3 })
  //     .getRawOne<{ totalSales: string; netProfit: string }>();

  //   return {
  //     totalSales: parseFloat(raw?.totalSales || '0'),
  //     netProfit: parseFloat(raw?.netProfit || '0'),
  //   };
  // }
}
