import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import {
  errorOnCreate,
  errorOnDelete,
  errorOnFind,
  errorOnUpdate,
  errorOnValidate,
  successOnDelete,
  successOnFindMany,
  successOnUpdate,
} from 'src/response';
import { validateId } from 'src/validator';
import { mapTrainingEdit, mapTrainingCreate } from './training.mapper';
import { TrainingService } from './training.service';
import {
  CreateTrainingRequest,
  EditTrainingRequest,
  ReorderTrainingRequest,
} from './type/training.request';

@Controller()
export class TrainingController {
  constructor(private readonly service: TrainingService) {}

  @Post('workout-sheets/:id/trainings')
  async create(
    @Param('id') workoutSheetId: string,
    @Body() training: CreateTrainingRequest
  ) {
    try {
      const lastPosition = await this.service.findLastPosition(Number(workoutSheetId));

      const mappedTraining = mapTrainingCreate(
        training,
        Number(workoutSheetId),
        lastPosition + 1
      );

      return await this.service.create(mappedTraining);
    } catch (error) {
      console.error(error);

      return errorOnCreate(error as PrismaClientUnknownRequestError);
    }
  }

  @Get('workout-sheets/:id/trainings')
  async findAll(@Param('id') workoutSheetId: string) {
    try {
      const dbResult = await this.service.findAll(Number(workoutSheetId));

      return successOnFindMany(dbResult);
    } catch (error) {
      console.error(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    }
  }

  @Patch('trainings/:id')
  async update(@Param('id') id: string, @Body() training: EditTrainingRequest) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    try {
      const trainingInDB = await this.service.findOne(Number(id));

      if (!trainingInDB) {
        return errorOnUpdate({ message: 'Id not found.' });
      }

      const mappedTraining = mapTrainingEdit(training);

      if (trainingInDB.workoutSheet.id !== mappedTraining.workoutSheetId) {
        const lastPositionInWorkoutSheet = await this.service.findLastPosition(
          Number(training.workoutSheet.id)
        );

        mappedTraining.position = lastPositionInWorkoutSheet + 1;
      }

      const dbResult = await this.service.update(Number(id), mappedTraining);

      return successOnUpdate(dbResult);
    } catch (error) {
      console.error(error);

      return errorOnUpdate(error as PrismaClientUnknownRequestError);
    }
  }

  @Patch('trainings')
  async reorder(@Body() request: ReorderTrainingRequest[]) {
    try {
      const dbResult = await Promise.all(
        request.map(async training => {
          return await this.service.update(training.id, training);
        })
      );

      const trainingsOrderedByPosition = dbResult.sort((a, b) => a.position - b.position);

      return successOnUpdate(trainingsOrderedByPosition);
    } catch (error) {
      console.error(error);

      return errorOnUpdate(error as PrismaClientUnknownRequestError);
    }
  }

  @Delete('trainings/:id')
  async delete(@Param('id') id: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    try {
      const dbResult = await this.service.delete(Number(id));

      return successOnDelete(dbResult);
    } catch (error) {
      console.error(error);

      return errorOnDelete(error as PrismaClientUnknownRequestError);
    }
  }
}
