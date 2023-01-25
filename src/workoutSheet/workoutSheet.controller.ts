import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { errorOnFind, errorOnValidate, successOnFindMany } from 'src/response';
import { TrainingService } from 'src/training/training.service';
import { validateId } from 'src/validator';
import { mapWorkoutSheetResponse } from './workoutSheet.mapper';
import { WorkoutSheetService } from './workoutSheet.service';

@Controller('api/workout-sheets')
export class WorkoutSheetController {
  constructor(
    private readonly workoutService: WorkoutSheetService,
    private readonly trainingService: TrainingService
  ) {}

  @Post()
  async create(@Body('name') name: string) {
    return this.workoutService.create(name);
  }

  @Get()
  async findAll() {
    try {
      const workoutSheets = await this.workoutService.findAll();
      const trainings = await this.trainingService.findAll();

      const workoutSheetResponse = mapWorkoutSheetResponse(workoutSheets, trainings);

      return successOnFindMany(workoutSheetResponse);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.workoutService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('name') name: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.workoutService.update(Number(id), name);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.workoutService.delete(Number(id));
  }
}
