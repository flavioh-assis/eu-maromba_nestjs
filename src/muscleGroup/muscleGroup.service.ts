import { Injectable } from '@nestjs/common';
import { db } from 'src/db.connection';

@Injectable()
export class MuscleGroupService {
  async findAll() {
    const muscleGroups = await db.muscleGroup.findMany();

    return muscleGroups;
  }
}
