import { Injectable } from '@nestjs/common';
import { PrismaClient, Training } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import {
  errorOnCreate,
  errorOnFind,
  errorOnUpdate,
  successOnCreate,
  successOnFind,
  successOnUpdate,
} from 'src/app.response';

const prisma = new PrismaClient();

@Injectable()
export class TrainingService {
  async create(training: Training) {
    try {
      const response = await prisma.training.create({
        data: training,
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
      const response = await prisma.training.findMany();

      return successOnFind(response);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(id: number, training: Training) {
    try {
      const response = await prisma.training.update({
        where: {
          id,
        },
        data: {
          obs: training.obs,
          reps: training.reps,
          restTime: training.restTime,
          sets: training.sets,
          workoutSheetId: training.workoutSheetId,
        },
      });

      return successOnUpdate(response);
    } catch (error) {
      console.log(error);

      return errorOnUpdate(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }
}
