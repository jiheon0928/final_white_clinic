import { CompleteState } from './entities/compliteState.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(CompleteState)
    private readonly compliteStateRepository: Repository<CompleteState>,
  ) {}

  async create(dto: CreateListDto): Promise<List> {
    const { riderId, industryId, statusId, ...rest } = dto;
    const entity = this.listRepository.create({
      ...rest,
      rider: { id: riderId },
      industry: { id: industryId },
      Status: { id: statusId },
      date: new Date(),
    });
    return this.listRepository.save(entity);
  }
  // =============================대기 상태 조회============================
  async findstate(): Promise<List[]> {
    return this.listRepository.find({
      where: { Status: { status: '대기' } },
      relations: ['rider', 'industry', 'Status'],
    });
  }

  async listupdate(name: string, list: List) {
    return this.listRepository.update(name, list);
  }

  // =============================기사 픽업 로직============================
  async pickup(taskId: number, riderId: number) {
    const inProgress = await this.compliteStateRepository.findOneBy({
      status: '진행',
    });
    if (!inProgress) throw new NotFoundException('진행 상태가 없네');

    const task = await this.listRepository.findOne({
      where: { id: taskId },
      relations: ['driver', 'field', 'compliteState'],
    });
    if (!task) throw new NotFoundException('해당 작업이 없어');

    task.rider = { id: riderId } as any;
    task.Status = inProgress;

    return this.listRepository.save(task);
  }

  // =============================기사 완료 로직============================
  async complete(taskId: number, riderId: number): Promise<List> {
    const task = await this.listRepository.findOne({
      where: { id: taskId },
      relations: ['rider', 'industry', 'Status'],
    });
    if (!task) throw new NotFoundException('해당 작업이 없습니다.');

    if (!task.rider || task.rider.id !== riderId) {
      throw new ForbiddenException('본인이 픽업한 작업만 완료할 수 있습니다.');
    }

    const done = await this.compliteStateRepository.findOneBy({
      status: '완료',
    });
    if (!done) throw new NotFoundException('완료 상태가 없습니다.');

    task.Status = done;
    return this.listRepository.save(task);
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
      const raw = await this.listRepository
        .createQueryBuilder('list')
        .select('SUM(list.amount)', 'sum')
        .where('list.riderId = :riderId', { riderId })
        .andWhere('list.date BETWEEN :start AND :end', {
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
      const raw = await this.listRepository
        .createQueryBuilder('list')
        .select('SUM(list.amount)', 'sum')
        .where('list.riderId = :riderId', { riderId })
        .andWhere('list.date BETWEEN :start AND :end', {
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
    const raw = await this.listRepository
      .createQueryBuilder('list')
      .select('SUM(list.amount)', 'sum')
      .where('list.riderId = :riderId', { riderId })
      .andWhere('list.date BETWEEN :start AND :end', {
        start: start.toISOString(),
        end: end.toISOString(),
      })
      .getRawOne();
    return Number(raw.sum) || 0;
  }
}
