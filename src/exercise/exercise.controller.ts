import { Controller, Get, Query } from '@nestjs/common';
import { successOnFindMany, errorOnFind, errorOnValidate } from 'src/response';
import { validateId } from 'src/validator';
import { ExerciseService } from './exercise.service';

@Controller('api/exercises')
export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  @Get()
  async findAll(@Query('muscleGroupId') query: string) {
    try {
      if (!query) {
        const exercises = await this.service.findAll();

        return successOnFindMany(exercises);
      }

      if (!validateId(query)) {
        return errorOnValidate(`Param muscleGroupId {${query}} is not valid.`);
      }

      const exercises = await this.service.findForMuscleGroup(+query);

      return successOnFindMany(exercises);
    } catch (error) {
      console.log(error);

      return errorOnFind(error);
    }
  }
}
