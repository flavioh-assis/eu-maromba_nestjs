import { Injectable } from '@nestjs/common';
import { PrismaClient, Training } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { db } from 'src/db.connection';
import {
  errorOnDelete,
  errorOnFind,
  errorOnUpdate,
  successOnDelete,
  successOnFindMany,
  successOnFindOne,
  successOnUpdate,
} from 'src/response';
import { prismaSelectTrainingResponse } from './training.constant';
import { TrainingResponse } from './type/training.response';

const prisma = new PrismaClient();

interface ITrainingService {
  create: (training: Training) => Promise<TrainingResponse>;
}

@Injectable()
export class TrainingService implements ITrainingService {
  async create(training: Training) {
    const dbResult = await db.training.create({
      data: training,
      select: prismaSelectTrainingResponse,
    });

    return dbResult as TrainingResponse;
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
