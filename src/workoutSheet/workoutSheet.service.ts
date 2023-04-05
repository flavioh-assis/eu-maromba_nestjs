import { Injectable } from '@nestjs/common';
import { db } from 'src/db.connection';
import { selectTrainingResponse } from 'src/training/training.constant';
import { EditWorkoutSheetDto } from './type/workoutSheet.dto';
import { WorkoutSheetResponse } from './type/workoutSheet.response';
import { WorkoutSheet } from '@prisma/client';

@Injectable()
export class WorkoutSheetService {
  async create(workoutSheet: WorkoutSheet) {
    const dbResult = await db.workoutSheet.create({
      data: workoutSheet,
    });

    return dbResult as WorkoutSheetResponse;
  }

  async findAll() {
    const dbResult = await db.workoutSheet.findMany({
      orderBy: {
        position: 'asc',
      },
    });

    return dbResult as WorkoutSheetResponse[];
  }

  async findLastPosition() {
    const dbResult = await db.workoutSheet.findMany({
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

  async update(id: number, workoutSheet: EditWorkoutSheetDto) {
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
