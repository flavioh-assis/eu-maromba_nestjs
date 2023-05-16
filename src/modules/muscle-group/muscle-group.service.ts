import { Injectable } from '@nestjs/common';
import { MuscleGroupRepository } from './muscle-group.repository';
import { MuscleGroupResponse } from './muscle-group.response';

@Injectable()
export class MuscleGroupService {
  constructor(private readonly muscleGroupRepository: MuscleGroupRepository) {}

  async findAll() {
    const result = await this.muscleGroupRepository.findAll();

    return result.map(mg => new MuscleGroupResponse(mg));
  }
}
