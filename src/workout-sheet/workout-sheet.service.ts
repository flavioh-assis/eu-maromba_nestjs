import { Injectable } from '@nestjs/common';
import { db } from 'db.connection';
import { ReorderWorkoutSheetDto } from './dto/reorder-workout-sheet.dto';
import { UpdateWorkoutSheetDto } from './dto/update-workout-sheet.dto';
import { WorkoutSheet } from '@prisma/client';
import { WorkoutSheetResponse } from './model/workout-sheet.response';

@Injectable()
export class WorkoutSheetService {
  async create(workoutSheet: WorkoutSheet) {
    return await db.workoutSheet.create({
      data: workoutSheet,
    });
  }

  async findAll() {
    const dbResult = await db.workoutSheet.findMany({
      select: {
        id: true,
        name: true,
        position: true,
        _count: {
          select: {
            trainings: true,
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    });

    return dbResult?.map(sheet => {
      return {
        ...sheet,
        trainingCount: sheet._count.trainings,
      } as WorkoutSheetResponse;
    });
  }

  async findOne(id: number) {
    return await db.workoutSheet.findUnique({
      where: {
        id,
      },
    });
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

  async update(id: number, workoutSheet: UpdateWorkoutSheetDto | ReorderWorkoutSheetDto) {
    return await db.workoutSheet.update({
      where: {
        id,
      },
      data: workoutSheet,
    });
  }

  async delete(id: number) {
    await db.workoutSheet.delete({
      where: {
        id: id,
      },
    });
  }
}
