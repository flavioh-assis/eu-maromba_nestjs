import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import {
  errorOnCreate,
  errorOnFind,
  successOnCreate,
  successOnFind,
} from 'src/app.response';

const prisma = new PrismaClient();

@Injectable()
export class WorkoutSheetService {
  async create(name: string) {
    try {
      const response = await prisma.workoutSheet.create({
        data: {
          name,
        },
      });

      return successOnCreate([response]);
    } catch (error) {
      console.log(error);

      return errorOnCreate(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll() {
    try {
      const response = await prisma.workoutSheet.findMany();

      return successOnFind(response);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }
}
