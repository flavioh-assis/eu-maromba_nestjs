import { Injectable } from '@nestjs/common';
import { db } from 'db.connection';
import { ReorderRoutineDto } from './dto/reorder-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { RoutineRepository } from './routine.repository';
import { Routine } from './routine.entity';
import { RoutineResponse } from './routine.response';

@Injectable()
export class RoutineService {
  constructor(private readonly routineRepository: RoutineRepository) {}

  async create(dto: CreateRoutineDto) {
    const lastPosition = await this.findLastPosition();
    const newRoutine = new Routine(dto.title, lastPosition);

    const result = await this.routineRepository.create(newRoutine);

    return new RoutineResponse(result);
  }

  async findAll() {
    const result = await this.routineRepository.findAll();

    return result?.map(entity => {
      return new RoutineResponse(entity);
    });
  }

  async findOne(id: number) {
    return await db.routine.findUnique({
      where: {
        id,
      },
    });
  }

  async findLastPosition() {
    const position = await this.routineRepository.findLastPosition();

    return position != null ? position + 1 : 0;
  }

  async update(id: number, routine: UpdateRoutineDto | ReorderRoutineDto) {
    return await db.routine.update({
      where: {
        id,
      },
      data: routine,
    });
  }

  async delete(id: number) {
    await db.routine.delete({
      where: {
        id: id,
      },
    });
  }
}
