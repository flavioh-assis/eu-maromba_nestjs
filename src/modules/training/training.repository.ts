import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { selectTrainingResponse } from './training.constant';
import { CreateTraining } from './entities/create-training.entity';
import { UpdateTraining } from './entities/update-training.entity';
import { TrainingResponse } from './training.response';

@Injectable()
export class TrainingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(training: CreateTraining) {
    return (await this.prisma.training.create({
      data: training,
      select: selectTrainingResponse,
    })) as TrainingResponse;
  }

  async findLastPosition(routineId: number) {
    const result = await this.prisma.training.findMany({
      where: {
        routineId,
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

    return result.length ? result[0].position : null;
  }

  async findAllByRoutineId(routineId: number) {
    return (await this.prisma.training.findMany({
      where: {
        routineId,
      },
      select: selectTrainingResponse,
      orderBy: [
        {
          position: 'asc',
        },
      ],
    })) as TrainingResponse[];
  }

  async findOne(id: number) {
    return (await this.prisma.training.findFirst({
      where: {
        id,
      },
      select: selectTrainingResponse,
    })) as TrainingResponse | null;
  }

  async updatePosition(id: number, position: number) {
    return (await this.prisma.training.update({
      where: {
        id,
      },
      data: {
        position,
      },
      select: selectTrainingResponse,
    })) as TrainingResponse;
  }

  async update(id: number, training: UpdateTraining) {
    return (await this.prisma.training.update({
      where: {
        id,
      },
      data: training,
      select: selectTrainingResponse,
    })) as TrainingResponse;
  }

  async delete(id: number) {
    return await this.prisma.training.delete({
      where: {
        id,
      },
    });
  }

  async deleteManyByRoutine(routineId: number) {
    return await this.prisma.training.deleteMany({
      where: {
        routineId,
      },
    });
  }
}
