import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ExerciseService {
  async findAll() {
    try {
      return await prisma.exercise.findMany();
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      await prisma.$disconnect();
    }
  }
}
