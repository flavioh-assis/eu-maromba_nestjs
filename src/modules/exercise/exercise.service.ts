import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from './exercise.repository';
import { ExerciseResponse } from './exercise.response';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async findOne(id: number) {
    const result = await this.exerciseRepository.findOne(id);

    return result ? new ExerciseResponse(result) : result;
  }

  async findAllForMuscleGroup(muscleGroupId: number) {
    const result = await this.exerciseRepository.findAllForMuscleGroup(muscleGroupId);

    return result.map(e => new ExerciseResponse(e));
  }
}
