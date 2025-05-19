// src/list/list.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async create(dto: CreateListDto): Promise<List> {
    const { driverId, fieldId, compliteStateId, ...rest } = dto;
    const entity = this.listRepository.create({
      ...rest,
      driver: { id: driverId },
      field: { id: fieldId },
      compliteState: { id: compliteStateId },
      registrationTime: new Date(),
    });
    return this.listRepository.save(entity);
  }

  async findList(): Promise<List[]> {
    return this.listRepository.find({
      relations: ['driver', 'field', 'compliteState'], // 필요 없으면 생략 가능
    });
  }
  // =============================주간 조회============================
  async getWeekly(driverId: number) {
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
      const raw = await this.listRepository
        .createQueryBuilder('list')
        .select('SUM(list.amount)', 'sum')
        .where('list.driverId = :driverId', { driverId })
        .andWhere('list.registrationTime BETWEEN :start AND :end', {
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
    driverId: number,
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
      const raw = await this.listRepository
        .createQueryBuilder('list')
        .select('SUM(list.amount)', 'sum')
        .where('list.driverId = :driverId', { driverId })
        .andWhere('list.registrationTime BETWEEN :start AND :end', {
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
    driverId: number,
    start: Date,
    end: Date,
  ): Promise<number> {
    const raw = await this.listRepository
      .createQueryBuilder('list')
      .select('SUM(list.amount)', 'sum')
      .where('list.driverId = :driverId', { driverId })
      .andWhere('list.registrationTime BETWEEN :start AND :end', {
        start: start.toISOString(),
        end: end.toISOString(),
      })
      .getRawOne();
    return Number(raw.sum) || 0;
  }

  //          대기중인 일만 조회
  async findPendingJobs(): Promise<List[]> {
    return this.listRepository.find({
      where: { compliteState: { status: '대기' } },
      relations: ['driver', 'field', 'compliteState'],
    });
  }

  //            진행중인 일 조회
  async findInProgressJobs(driverId: number): Promise<List[]> {
    return this.listRepository.find({
      where: {
        driver: { id: driverId },
        compliteState: { status: '진행' },
      },
      relations: ['driver', 'compliteState', 'field'],
    });
  }

  async findCompletedJobs(driverId: number): Promise<List[]> {
    return this.listRepository.find({
      where: {
        driver: { id: driverId },
        compliteState: { status: '완료' },
      },
      relations: ['driver', 'compliteState', 'field'],
    });
  }
}
