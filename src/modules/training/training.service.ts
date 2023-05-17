import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ReorderTrainingDto } from './dto/reorder-training.dto';
import { TrainingRepository } from './training.repository';
import { RoutineRepository } from 'modules/routine/routine.repository';
import { ExerciseRepository } from 'modules/exercise/exercise.repository';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTraining } from './entities/update-training.entity';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { CreateTraining } from './entities/create-training.entity';

@Injectable()
export class TrainingService {
  constructor(
    private readonly exerciseRepository: ExerciseRepository,
    private readonly routineRepository: RoutineRepository,
    private readonly trainingRepository: TrainingRepository
  ) {}

  async create(routineId: number, dto: CreateTrainingDto) {
    const routine = await this.routineRepository.findOne(routineId);
    if (!routine) {
      return new UnprocessableEntityException('Routine does not exist.');
    }

    const exercise = await this.exerciseRepository.findOne(dto.exercise.id);
    if (!exercise) {
      return new UnprocessableEntityException('Exercise does not exist.');
    }

    const position = await this.getNextAvailablePosition(routineId);
    const newTraining = new CreateTraining(dto, routineId, position);

    return await this.trainingRepository.create(newTraining);
  }

  async getNextAvailablePosition(routineId: number) {
    const position = await this.trainingRepository.findLastPosition(routineId);

    return position != null ? position + 1 : 0;
  }

  async findAllByRoutine(routineId: number) {
    const routineExist = await this.routineRepository.findOne(routineId);
    if (!routineExist) {
      throw new UnprocessableEntityException('Routine does not exist.');
    }

    return await this.trainingRepository.findAllByRoutine(routineId);
  }

  async findOne(id: number) {
    return await this.trainingRepository.findOne(id);
  }

  async reorder(dto: ReorderTrainingDto[]) {
    const positionsSet = new Set<number>();

    await Promise.all(
      dto.map(async t => {
        const result = await this.findOne(t.id);

        if (!result)
          throw new UnprocessableEntityException('At least one training does not exist.');

        if (positionsSet.has(t.position)) {
          throw new BadRequestException('At least two trainings have the same position.');
        }
        positionsSet.add(t.position);
      })
    );

    const result = await Promise.all(
      dto.map(async t => {
        return await this.trainingRepository.updatePosition(t.id, t.position);
      })
    );

    const trainingsSortedByPosition = result.sort((a, b) => a.position - b.position);

    return trainingsSortedByPosition;
  }

  async update(id: number, dto: UpdateTrainingDto) {
    const trainingExist = await this.findOne(id);
    if (!trainingExist) {
      throw new UnprocessableEntityException('Training does not exist.');
    }

    const routineExist = await this.routineRepository.findOne(dto.routine.id);
    if (!routineExist) {
      throw new UnprocessableEntityException('Routine does not exist.');
    }

    const exerciseExist = await this.exerciseRepository.findOne(dto.exercise.id);
    if (!exerciseExist) {
      throw new UnprocessableEntityException('Exercise does not exist.');
    }

    const training = new UpdateTraining(dto);

    return await this.trainingRepository.update(id, training);
  }

  async delete(id: number) {
    const trainingExist = await this.findOne(id);

    if (!trainingExist) {
      throw new UnprocessableEntityException('Training does not exist.');
    }

    return await this.trainingRepository.delete(id);
  }
}
