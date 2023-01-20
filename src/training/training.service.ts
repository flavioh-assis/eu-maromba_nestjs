import { Injectable } from '@nestjs/common';
import { PrismaClient, Training } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import {
  errorOnCreate,
  errorOnDelete,
  errorOnFind,
  errorOnUpdate,
  successOnCreate,
  successOnDelete,
  successOnFindMany,
  successOnFindOne,
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

      return successOnCreate(response);
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

      return successOnFindMany(response);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }

  async findOne(id: number) {
    try {
      const response = await prisma.training.findUnique({
        where: {
          id,
        },
      });

      return successOnFindOne(response);
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

  async delete(id: number) {
    try {
      const response = await prisma.training.delete({
        where: {
          id,
        },
      });

      return successOnDelete(response);
    } catch (error) {
      console.log(error);

      return errorOnDelete(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }
}
