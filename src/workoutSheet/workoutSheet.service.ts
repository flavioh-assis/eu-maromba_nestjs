import { Injectable } from '@nestjs/common';
import { db } from 'src/db.connection';
import { selectTrainingResponse } from 'src/training/training.constant';
import { WorkoutSheetRequest } from './type/workoutSheet.request';
import { WorkoutSheetResponse } from './type/workoutSheet.response';

@Injectable()
export class WorkoutSheetService {
  async create(workoutSheet: WorkoutSheetRequest) {
    const dbResult = await db.workoutSheet.create({
      data: workoutSheet,
      select: {
        id: true,
        name: true,
        trainings: {
          orderBy: {
            position: 'asc',
          },
          select: selectTrainingResponse,
        },
      },
    });

    return dbResult as WorkoutSheetResponse;
  }

  async findAll() {
    const dbResult = await db.workoutSheet.findMany({
      select: {
        id: true,
        name: true,
        trainings: {
          orderBy: {
            position: 'asc',
          },
          select: selectTrainingResponse,
        },
      },
    });

    return dbResult as WorkoutSheetResponse[];
  }

  async findOne(id: number) {
    const dbResult = await db.workoutSheet.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        trainings: {
          orderBy: {
            position: 'asc',
          },
          select: selectTrainingResponse,
        },
      },
    });

    return dbResult as WorkoutSheetResponse;
  }

  async update(id: number, workoutSheet: WorkoutSheetRequest) {
    const dbResult = await db.workoutSheet.update({
      where: {
        id,
      },
      data: workoutSheet,
      select: {
        id: true,
        name: true,
        trainings: {
          orderBy: {
            position: 'asc',
          },
          select: selectTrainingResponse,
        },
      },
    });

    return dbResult as WorkoutSheetResponse;
  }

  async delete(id: number) {
    const dbResult = await db.workoutSheet.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        trainings: {
          orderBy: {
            position: 'asc',
          },
          select: selectTrainingResponse,
        },
      },
    });

    return dbResult as WorkoutSheetResponse;
  }
}
