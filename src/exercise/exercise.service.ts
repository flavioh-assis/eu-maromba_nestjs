import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { errorOnFind, successOnFindMany } from 'src/app.response';

const prisma = new PrismaClient();

@Injectable()
export class ExerciseService {
  async findAll() {
    try {
      const response = await prisma.exercise.findMany();

      return successOnFindMany(response);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }
}
