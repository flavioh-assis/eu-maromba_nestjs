import { Injectable } from '@nestjs/common';
import { PrismaClient, Training } from '@prisma/client';
import { db } from 'src/db.connection';
import { selectTrainingResponse } from './training.constant';
import { TrainingResponse } from './type/training.response';

const prisma = new PrismaClient();

interface ITrainingService {
  create: (training: Training) => Promise<TrainingResponse>;
  findAll: () => Promise<TrainingResponse[]>;
  findOne: (id: number) => Promise<TrainingResponse>;
  update: (id: number, training: Training) => Promise<TrainingResponse>;
  delete: (id: number) => Promise<TrainingResponse>;
}

@Injectable()
export class TrainingService implements ITrainingService {
  async create(training: Training) {
    const dbResult = await db.training.create({
      data: training,
      select: selectTrainingResponse,
    });

    return dbResult as TrainingResponse;
  }

  async findAll() {
    const dbResult = await db.training.findMany({
      select: selectTrainingResponse,
    });

    return dbResult as TrainingResponse[];
  }

  async findOne(id: number) {
    const dbResult = await db.training.findUnique({
      where: {
        id,
      },
      select: selectTrainingResponse,
    });

    return dbResult as TrainingResponse;
  }

  async update(id: number, training: Training) {
    const dbResult = await prisma.training.update({
      where: {
        id,
      },
      data: training,
      select: selectTrainingResponse,
    });

    return dbResult as TrainingResponse;
  }

  async delete(id: number) {
    const dbResult = await prisma.training.delete({
      where: {
        id,
      },
      select: selectTrainingResponse,
    });

    return dbResult as TrainingResponse;
  }
}
