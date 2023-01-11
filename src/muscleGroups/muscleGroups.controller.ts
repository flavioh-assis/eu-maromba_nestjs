import { Controller, Get } from '@nestjs/common';
import { MuscleGroupsService } from './muscleGroups.service';

@Controller('api/muscle-groups')
export class MuscleGroupsController {
  constructor(private readonly service: MuscleGroupsService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
