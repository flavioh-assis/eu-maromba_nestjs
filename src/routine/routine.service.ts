import { Injectable } from '@nestjs/common';
import { db } from 'db.connection';
import { ReorderRoutineDto } from './dto/reorder-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from '@prisma/client';
import { RoutineResponse } from './model/routine.response';

@Injectable()
export class RoutineService {
  async create(routine: Routine) {
    return await db.routine.create({
      data: routine,
    });
  }

  async findAll() {
    const dbResult = await db.routine.findMany({
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

    return dbResult?.map(routine => {
      return {
        ...routine,
        trainingCount: routine._count.trainings,
      } as RoutineResponse;
    });
  }

  async findOne(id: number) {
    return await db.routine.findUnique({
      where: {
        id,
      },
    });
  }

  async findLastPosition() {
    const dbResult = await db.routine.findMany({
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

  async update(id: number, routine: UpdateRoutineDto | ReorderRoutineDto) {
    return await db.routine.update({
      where: {
        id,
      },
      data: routine,
    });
  }

  async delete(id: number) {
    await db.routine.delete({
      where: {
        id: id,
      },
    });
  }
}
