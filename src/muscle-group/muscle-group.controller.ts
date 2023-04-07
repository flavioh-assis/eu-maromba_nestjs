import { Controller, Get } from '@nestjs/common';
import { successOnFindMany, errorOnFind } from 'src/response';
import { MuscleGroupService } from './muscle-group.service';

@Controller('muscle-groups')
export class MuscleGroupController {
  constructor(private readonly service: MuscleGroupService) {}

  @Get()
  async findAll() {
    try {
      const muscleGroups = await this.service.findAll();

      return successOnFindMany(muscleGroups);
    } catch (error) {
      console.error(error);

      return errorOnFind(error);
    }
  }
}
