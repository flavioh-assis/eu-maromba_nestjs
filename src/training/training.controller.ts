import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import {
  errorOnCreate,
  errorOnDelete,
  errorOnFind,
  errorOnUpdate,
  errorOnValidate,
  successOnCreate,
  successOnDelete,
  successOnFindMany,
  successOnFindOne,
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

@Controller('api/trainings')
export class TrainingController {
  constructor(private readonly service: TrainingService) {}

  @Post()
  async create(@Body() training: CreateTrainingRequest) {
    try {
      const lastPosition = await this.service.findLastPosition(training.workoutSheet.id);

      const mappedTraining = mapTrainingCreate(training, lastPosition + 1);

      const dbResult = await this.service.create(mappedTraining);

      return successOnCreate(dbResult);
    } catch (error) {
      console.log(error);

      return errorOnCreate(error as PrismaClientUnknownRequestError);
    }
  }

  @Get()
  async findAll() {
    try {
      const dbResult = await this.service.findAll();

      return successOnFindMany(dbResult);
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

    try {
      const dbResult = await this.service.findOne(Number(id));

      return successOnFindOne(dbResult);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() training: EditTrainingRequest) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    try {
      const mappedTraining = mapTrainingEdit(training);

      const dbResult = await this.service.update(+id, mappedTraining);

      return successOnUpdate(dbResult);
    } catch (error) {
      console.log(error);

      return errorOnUpdate(error as PrismaClientUnknownRequestError);
    }
  }

  @Patch()
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
      console.log(error);

      return errorOnUpdate(error as PrismaClientUnknownRequestError);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    try {
      const dbResult = await this.service.delete(Number(id));

      return successOnDelete(dbResult);
    } catch (error) {
      console.log(error);

      return errorOnDelete(error as PrismaClientUnknownRequestError);
    }
  }
}
