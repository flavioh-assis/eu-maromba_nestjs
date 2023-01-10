import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getMuscleGroups() {
    return await prisma.muscleGroup.findMany();
  }

  async getExercises() {
    return await prisma.exercise.findMany();
  }
}
