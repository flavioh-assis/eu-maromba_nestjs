import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MuscleGroupsService {
  async findAll() {
    try {
      return await prisma.muscleGroup.findMany();
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      await prisma.$disconnect();
    }
  }
}
