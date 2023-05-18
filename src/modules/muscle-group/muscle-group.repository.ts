import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class MuscleGroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.muscleGroup.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });
  }
}
