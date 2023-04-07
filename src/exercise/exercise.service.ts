import { Injectable } from '@nestjs/common';
import { db } from 'src/db.connection';

@Injectable()
export class ExerciseService {
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
