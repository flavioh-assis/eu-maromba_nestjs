import { BadRequestException, Injectable } from '@nestjs/common';
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
    const positionAvailable = await this.findNextPositionAvailable();
    const newRoutine = new Routine(dto.title, positionAvailable);

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
    return await this.routineRepository.findOne(id);
  }

  async findNextPositionAvailable() {
    const position = await this.routineRepository.findLastPosition();

    return position != null ? position + 1 : 0;
  }

  async reorder(dto: ReorderRoutineDto[]) {
    dto?.map(async routine => {
      const result = await this.findOne(routine.id);

      if (result == null)
        return new BadRequestException('One or more routines do not exist.');
    });

    const result = await Promise.all(
      dto.map(async routine => {
        return await this.routineRepository.updatePosition(routine.id, routine.position);
      })
    );

    const routinesOrderedByPosition = result.sort((a, b) => a.position - b.position);

    return routinesOrderedByPosition;
  }

  async update(id: number, routine: UpdateRoutineDto) {
    const exist = await this.findOne(id);

    if (!exist) {
      return new BadRequestException('Routine does not exist.');
    }

    return await this.routineRepository.update(id, routine.title);
  }

  async delete(id: number) {
    await db.routine.delete({
      where: {
        id: id,
      },
    });
  }
}
