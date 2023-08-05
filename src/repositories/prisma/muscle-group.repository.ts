import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { IMuscleGroupRepository } from 'repositories/muscle-group.interface';

@Injectable()
export class PrismaMuscleGroupRepository implements IMuscleGroupRepository {
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
