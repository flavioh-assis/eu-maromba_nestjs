import { Injectable } from '@nestjs/common';
import { db } from 'src/db.connection';
import { EditWorkoutSheetDto, ReorderWorkoutSheetDto } from './type/workoutSheet.dto';
import { WorkoutSheet } from '@prisma/client';

@Injectable()
export class WorkoutSheetService {
  async create(workoutSheet: WorkoutSheet) {
    return await db.workoutSheet.create({
      data: workoutSheet,
    });
  }

  async findAll() {
    return await db.workoutSheet.findMany({
      orderBy: {
        position: 'asc',
      },
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

  async update(id: number, workoutSheet: EditWorkoutSheetDto | ReorderWorkoutSheetDto) {
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
