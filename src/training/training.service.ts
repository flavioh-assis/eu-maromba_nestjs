import { Injectable } from '@nestjs/common';
import { Training } from '@prisma/client';
import { db } from 'src/db.connection';
import { selectTrainingResponse } from './training.constant';
import { ReorderTrainingRequest } from './type/training.request';
import { TrainingResponse } from './type/training.response';

@Injectable()
export class TrainingService {
  async create(training: Training) {
    const dbResult = await db.training.create({
      data: training,
      select: selectTrainingResponse,
    });

    return dbResult as TrainingResponse;
  }

  async findAll(workoutSheetId: number) {
    const dbResult = await db.training.findMany({
      where: {
        workoutSheetId,
      },
      select: selectTrainingResponse,
      orderBy: [
        {
          position: 'asc',
        },
      ],
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

  async findLastPosition(workoutSheetId: number) {
    const dbResult = await db.training.findMany({
      where: {
        workoutSheetId,
      },
      select: {
        position: true,
      },
      orderBy: [
        {
          position: 'desc',
        },
      ],
      take: 1,
    });

    return dbResult.length ? dbResult[0].position : 0;
  }

  async update(id: number, training: Training | ReorderTrainingRequest) {
    const dbResult = await db.training.update({
      where: {
        id,
      },
      data: training,
      select: selectTrainingResponse,
    });

    return dbResult as TrainingResponse;
  }

  async delete(id: number) {
    const dbResult = await db.training.delete({
      where: {
        id,
      },
      select: selectTrainingResponse,
    });

    return dbResult as TrainingResponse;
  }
}
