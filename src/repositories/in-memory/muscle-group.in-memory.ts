import { muscleGroups } from '@database/seed/constant';
import { MuscleGroup } from '@prisma/client';
import { IMuscleGroupRepository } from 'repositories/muscle-group.interface';

export class MuscleGroupRepositoryInMemory implements IMuscleGroupRepository {
  private muscleGroupsInDB = muscleGroups;

  async findAll(): Promise<MuscleGroup[]> {
    return await this.muscleGroupsInDB;
  }
}
