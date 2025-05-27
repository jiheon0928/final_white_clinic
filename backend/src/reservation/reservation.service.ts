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

  // =============================대기 상태 조회============================
  async findstate(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { status: { status: '대기' } },
      relations: ['rider', 'industry', 'status'],
    });
  }

  async listupdate(name: string, reservation: Reservation) {
    return this.reservationRepository.update(name, reservation);
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

  // =============================기사 완료 로직============================
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

  // =============================주간 조회============================
  async getWeekly(riderId: number) {
    const now = new Date();
    const day = now.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const mondayThis = new Date(now);
    mondayThis.setDate(now.getDate() + mondayOffset);
    const sundayThis = new Date(mondayThis);
    sundayThis.setDate(mondayThis.getDate() + 6);

    const mondayLast = new Date(mondayThis);
    mondayLast.setDate(mondayThis.getDate() - 7);
    const sundayLast = new Date(sundayThis);
    sundayLast.setDate(sundayThis.getDate() - 7);

    const sumFor = async (start: Date, end: Date) => {
      const raw = await this.reservationRepository
        .createQueryBuilder('reservation')
        .select('SUM(reservation.amount)', 'sum')
        .where('reservation.riderId = :riderId', { riderId })
        .andWhere('reservation.date BETWEEN :start AND :end', {
          start: start.toISOString(),
          end: end.toISOString(),
        })
        .getRawOne();
      return Number(raw.sum) || 0;
    };

    const currentWeek = await sumFor(mondayThis, sundayThis);
    const lastWeek = await sumFor(mondayLast, sundayLast);

    return { currentWeek, lastWeek };
  }

  // =============================월간 조회============================

  async getMonthly(
    riderId: number,
  ): Promise<{ currentMonth: number; lastMonth: number }> {
    const now = new Date(); // 오늘 날짜

    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const lastDayThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const firstDayLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );

    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const sumFor = async (start: Date, end: Date): Promise<number> => {
      const raw = await this.reservationRepository
        .createQueryBuilder('reservation')
        .select('SUM(reservation.amount)', 'sum')
        .where('reservation.riderId = :riderId', { riderId })
        .andWhere('reservation.date BETWEEN :start AND :end', {
          start: start.toISOString(),
          end: end.toISOString(),
        })
        .getRawOne();
      return Number(raw.sum) || 0;
    };

    const currentMonth = await sumFor(firstDayThisMonth, lastDayThisMonth);
    const lastMonth = await sumFor(firstDayLastMonth, lastDayLastMonth);

    return { currentMonth, lastMonth };
  }
  // =============================선택 일수 조회============================
  async getRangeIncome(
    riderId: number,
    start: Date,
    end: Date,
  ): Promise<number> {
    const raw = await this.reservationRepository
      .createQueryBuilder('reservation')
      .select('SUM(reservation.amount)', 'sum')
      .where('reservation.riderId = :riderId', { riderId })
      .andWhere('reservation.date BETWEEN :start AND :end', {
        start: start.toISOString(),
        end: end.toISOString(),
      })
      .getRawOne();
    return Number(raw.sum) || 0;
  }
}
//.
