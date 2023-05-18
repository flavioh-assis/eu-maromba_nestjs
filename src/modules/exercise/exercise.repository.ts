import { Injectable } from '@nestjs/common';
import { ExerciseDbResult } from '@database/interfaces/exercise.result';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class ExerciseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    return (await this.prisma.exercise.findFirst({
      where: {
        id,
      },
    })) as ExerciseDbResult | null;
  }

  async findAllForMuscleGroup(muscleGroupId: number) {
    return (await this.prisma.exercise.findMany({
      where: {
        muscleGroupId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: [
        {
          name: 'asc',
        },
      ],
    })) as ExerciseDbResult[];
  }
}
