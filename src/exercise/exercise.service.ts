import { Injectable } from '@nestjs/common';
import { db } from 'src/db.connection';
import { selectExerciseResponse } from './exercise.constant';
import { ExerciseResponse } from './type/exercise.response';

@Injectable()
export class ExerciseService {
  async findAll() {
    const dbResult = await db.exercise.findMany({
      select: selectExerciseResponse,
    });

    return dbResult as ExerciseResponse[];
  }

  async findForMuscleGroup(muscleGroupId: number) {
    const dbResult = await db.exercise.findMany({
      where: {
        muscleGroupId,
      },
      select: selectExerciseResponse,
    });

    return dbResult as ExerciseResponse[];
  }
}
