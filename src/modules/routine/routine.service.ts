import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ReorderRoutineDto } from './dto/reorder-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { RoutineRepository } from './routine.repository';
import { Routine } from './routine.entity';
import { RoutineResponse } from './routine.response';
import { TrainingService } from 'modules/training/training.service';

@Injectable()
export class RoutineService {
  constructor(
    private readonly routineRepository: RoutineRepository,
    private readonly trainingService: TrainingService
  ) {}

  async create(dto: CreateRoutineDto) {
    const positionAvailable = await this.getNextPositionAvailable();
    const routine = new Routine(dto.title, positionAvailable);

    const result = await this.routineRepository.create(routine);

    return new RoutineResponse(result);
  }

  async findAll() {
    const result = await this.routineRepository.findAll();

    return result.map(entity => {
      return new RoutineResponse(entity);
    });
  }

  async findOne(id: number) {
    return await this.routineRepository.findOne(id);
  }

  async getNextPositionAvailable() {
    const position = await this.routineRepository.findLastPosition();

    return position != null ? position + 1 : 0;
  }

  async reorder(dto: ReorderRoutineDto[]) {
    const positionsSet = new Set<number>();

    await Promise.all(
      dto.map(async routine => {
        const result = await this.findOne(routine.id);

        if (result == null) throw new UnprocessableEntityException();

        if (positionsSet.has(routine.position)) {
          throw new BadRequestException('At least two routines have the same position.');
        }
        positionsSet.add(routine.position);
      })
    );

    const result = await Promise.all(
      dto.map(async routine => {
        return await this.routineRepository.updatePosition(routine.id, routine.position);
      })
    );

    const routinesOrderedByPosition = result.sort((a, b) => a.position - b.position);

    return routinesOrderedByPosition.map(r => new RoutineResponse(r));
  }

  async update(id: number, routine: UpdateRoutineDto) {
    const routineExist = await this.findOne(id);
    if (!routineExist) {
      return new UnprocessableEntityException('Routine does not exist.');
    }

    const result = await this.routineRepository.update(id, routine.title);

    return new RoutineResponse(result);
  }

  async delete(id: number) {
    const routineExist = await this.routineRepository.findOne(id);
    if (!routineExist) {
      throw new UnprocessableEntityException('Routine does not exist.');
    }

    const trainings = await this.trainingService.findAllByRoutineId(id);
    if (trainings.length) {
      await this.trainingService.deleteManyByRoutine(id);
    }

    return await this.routineRepository.delete(id);
  }
}
