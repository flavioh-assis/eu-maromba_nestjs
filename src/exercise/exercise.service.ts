import { Injectable } from '@nestjs/common';
import { db } from 'db.connection';

@Injectable()
export class ExerciseService {
  async findOne(id: number) {
    return await db.exercise.findFirst({
      where: {
        id,
      },
    });
  }

  async findAllForMuscleGroup(muscleGroupId: number) {
    return await db.exercise.findMany({
      where: {
        muscleGroupId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });
  }
}
