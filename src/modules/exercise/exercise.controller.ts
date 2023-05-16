import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Exercise')
@Controller()
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  async findAllForMuscleGroup(
    @Param('muscleGroupId', ParseIntPipe) muscleGroupId: number
  ) {
    return await this.exerciseService.findAllForMuscleGroup(muscleGroupId);
  }
}
