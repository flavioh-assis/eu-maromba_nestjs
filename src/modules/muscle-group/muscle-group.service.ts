import { Injectable } from '@nestjs/common';
import { db } from 'db.connection';

@Injectable()
export class MuscleGroupService {
  async findAll() {
    return await db.muscleGroup.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });
  }
}
