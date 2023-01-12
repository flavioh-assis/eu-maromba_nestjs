import { Controller, Get } from '@nestjs/common';
import { MuscleGroupService } from './muscleGroup.service';

@Controller('api/muscle-groups')
export class MuscleGroupController {
  constructor(private readonly service: MuscleGroupService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
