import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TrainingService {
  async findAll() {
    try {
      return await prisma.training.findMany();
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      await prisma.$disconnect();
    }
  }
}
