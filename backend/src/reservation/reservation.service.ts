import { CompleteState } from './entities/compliteState.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

    const { industry, ...rest } = dto;

    const entity = this.reservationRepository.create({
      ...rest,
      industry: { id: industry },
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

  // ============================= 픽업 기사용 진행 완료 조회 =============================
  async findByRider(riderId: number): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { rider: { id: riderId } },
      relations: ['rider', 'status', 'industry'],
      order: { visitTime: 'ASC' },
    });
  }

  // 2) riderId + 특정 status
  async findByRiderAndStatus(
    riderId: number,
    status: '진행' | '완료',
  ): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: {
        rider: { id: riderId },
        status: { status },
      },
      relations: ['rider', 'status', 'industry'],
      order: { visitTime: 'ASC' },
    });
  }

  // ============================= 예약 정보 수정 ============================
  async listupdate(id: number, dto: UpdateReservationDto) {
    const { industry, ...rest } = dto;
    await this.reservationRepository.update(id, {
      ...rest,
      industry: { id: industry },
    });
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
}
