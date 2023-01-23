import { Injectable } from '@nestjs/common';
import { db } from 'src/db.connection';

@Injectable()
export class ExerciseService {
  async findAll() {
    const exercises = await db.exercise.findMany();

    return exercises;
  }
}
