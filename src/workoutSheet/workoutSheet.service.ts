import { Injectable } from '@nestjs/common';
import { db } from 'src/db.connection';
import { WorkoutSheetResponse } from './type/workoutSheet.response';
import { selectWorkoutResponse } from './workoutSheet.constant';

@Injectable()
export class WorkoutSheetService {
  async create(name: string) {
    const dbResult = await db.workoutSheet.create({
      data: {
        name,
      },
      select: selectWorkoutResponse,
    });

    return dbResult as WorkoutSheetResponse;
  }

  async findAll() {
    const dbResult = await db.workoutSheet.findMany({
      select: selectWorkoutResponse,
    });

    return dbResult as WorkoutSheetResponse[];
  }

  async findOne(id: number) {
    const dbResult = await db.workoutSheet.findUnique({
      where: {
        id,
      },
      select: selectWorkoutResponse,
    });

    return dbResult as WorkoutSheetResponse;
  }

  async update(id: number, name: string) {
    const dbResult = await db.workoutSheet.update({
      where: {
        id,
      },
      data: {
        name,
      },
      select: selectWorkoutResponse,
    });

    return dbResult as WorkoutSheetResponse;
  }

  async delete(id: number) {
    const dbResult = await db.workoutSheet.delete({
      where: {
        id: id,
      },
      select: selectWorkoutResponse,
    });

    return dbResult as WorkoutSheetResponse;
  }
}
