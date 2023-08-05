import { Inject, Injectable } from '@nestjs/common';
import { MuscleGroupResponse } from './muscle-group.response';
import { IMuscleGroupRepository } from 'repositories/muscle-group.interface';

@Injectable()
export class MuscleGroupService {
  constructor(
    @Inject('IMuscleGroupRepository')
    private muscleGroupRepository: IMuscleGroupRepository
  ) {}

  async findAll() {
    const result = await this.muscleGroupRepository.findAll();

    return result.map(mg => new MuscleGroupResponse(mg));
  }
}
