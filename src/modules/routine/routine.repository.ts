import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { Routine } from './routine.entity';
import { RoutineDbResult } from 'database/interfaces/routine.result';
import { sqltag } from '@prisma/client/runtime';

@Injectable()
export class RoutineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(routine: Routine) {
    return (await this.prisma.routine.create({
      data: routine,
      include: {
        _count: {
          select: {
            trainings: true,
          },
        },
      },
    })) as RoutineDbResult;
  }

  async findLastPosition() {
    const result = await this.prisma.$queryRaw<{ max: number | null }[]>(
      sqltag`SELECT MAX(position) FROM routines`
    );

    return result[0].max;
  }

  async findAll() {
    return (await this.prisma.routine.findMany({
      include: {
        _count: {
          select: {
            trainings: true,
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    })) as RoutineDbResult[];
  }

  async findOne(id: number) {
    return (await this.prisma.routine.findFirst({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            trainings: true,
          },
        },
      },
    })) as RoutineDbResult | null;
  }

  async updatePosition(id: number, position: number) {
    return (await this.prisma.routine.update({
      where: {
        id,
      },
      data: {
        position,
      },
      include: {
        _count: {
          select: {
            trainings: true,
          },
        },
      },
    })) as RoutineDbResult;
  }

  async update(id: number, title: string) {
    return (await this.prisma.routine.update({
      where: {
        id,
      },
      data: {
        name: title,
      },
      include: {
        _count: {
          select: {
            trainings: true,
          },
        },
      },
    })) as RoutineDbResult;
  }

  async delete(id: number) {
    return await this.prisma.routine.delete({
      where: {
        id,
      },
    });
  }
}
