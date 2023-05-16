import { Controller, Get } from '@nestjs/common';
import { MuscleGroupService } from './muscle-group.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Muscle Group')
@Controller()
export class MuscleGroupController {
  constructor(private readonly muscleGroupService: MuscleGroupService) {}

  @Get()
  async findAll() {
    return await this.muscleGroupService.findAll();
  }
}
