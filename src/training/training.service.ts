import { Injectable } from '@nestjs/common';
import { Training } from '@prisma/client';
import { db } from 'db.connection';
import { selectTrainingResponse } from './training.constant';
import { TrainingResponse } from './response/training.response';
import { ReorderTrainingDto } from './dto/reorder-training.dto';

@Injectable()
export class TrainingService {
  async create(training: Training) {
    const createdTraining = await db.training.create({
      data: training,
      select: selectTrainingResponse,
    });

    return createdTraining as TrainingResponse;
  }

  async findAllByWorkoutSheetId(workoutSheetId: number) {
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
    return await db.training.findFirst({
      where: {
        id,
      },
      select: selectTrainingResponse,
    });
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

  async update(id: number, training: Training | ReorderTrainingDto) {
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
    await db.training.delete({
      where: {
        id,
      },
      select: selectTrainingResponse,
    });
  }
}
