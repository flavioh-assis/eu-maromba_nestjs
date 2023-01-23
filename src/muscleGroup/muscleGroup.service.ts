import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MuscleGroupService {
  async findAll() {
    const muscleGroups = await prisma.muscleGroup.findMany();

    await prisma.$disconnect();

    return muscleGroups;
  }
}
