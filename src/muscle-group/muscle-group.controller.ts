import { Controller, Get } from '@nestjs/common';
import { MuscleGroupService } from './muscle-group.service';

@Controller('muscle-groups')
export class MuscleGroupController {
  constructor(private readonly service: MuscleGroupService) {}

  @Get()
  async findAll() {
    return await this.service.findAll();
  }
}
