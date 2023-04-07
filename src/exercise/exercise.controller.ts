import { Controller, Get, Param } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller()
export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  @Get('muscle-groups/:id/exercises')
  async findAllForMuscleGroup(@Param('id') muscleGroupId: number) {
    return await this.service.findAllForMuscleGroup(muscleGroupId);
  }
}
