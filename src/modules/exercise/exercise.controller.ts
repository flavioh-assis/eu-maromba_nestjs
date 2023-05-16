import { Controller, Get, Param } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Exercise')
@Controller()
export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  @Get()
  async findAllForMuscleGroup(@Param('muscleGroupId') muscleGroupId: number) {
    return await this.service.findAllForMuscleGroup(muscleGroupId);
  }
}
