import { MuscleGroup } from '@prisma/client';

export interface IMuscleGroupRepository {
  findAll(): Promise<MuscleGroup[]>;
}
