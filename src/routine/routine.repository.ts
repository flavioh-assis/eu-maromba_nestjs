import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { Routine } from './routine.entity';
import { RoutineDbResult } from 'database/prisma.interfaces';
import { sqltag } from '@prisma/client/runtime';
import { prismaRoutineSelect } from './routine.constants';

@Injectable()
export class RoutineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(routine: Routine) {
    const dbResult = await this.prisma.routine.create({
      data: routine,
      include: {
        _count: {
          select: {
            trainings: true,
          },
        },
      },
    });

    return dbResult as RoutineDbResult;
  }

  async findLastPosition() {
    const result = await this.prisma.$queryRaw<{ max: number | null }[]>(
      sqltag`SELECT MAX(position) FROM routines`
    );

    return result[0].max;
  }

  async findAll() {
    return await this.prisma.routine.findMany({
      select: prismaRoutineSelect,
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.routine.findFirst({
      where: {
        id,
      },
    });
  }
}
