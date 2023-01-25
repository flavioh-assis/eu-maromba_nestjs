import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
import { WorkoutSheetRequest } from './type/workoutSheet.request';
import { WorkoutSheetService } from './workoutSheet.service';

@Controller('api/workout-sheets')
export class WorkoutSheetController {
  constructor(private readonly service: WorkoutSheetService) {}

  @Post()
  async create(@Body() request: WorkoutSheetRequest) {
    try {
      const dbResult = await this.service.create(request);

      return successOnCreate(dbResult);
    } catch (error) {
      console.log(error);

      return errorOnCreate(error as PrismaClientUnknownRequestError);
    }
  }

  @Get()
  async findAll() {
    try {
      const workoutSheets = await this.service.findAll();

      return successOnFindMany(workoutSheets);
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
      const workoutSheet = await this.service.findOne(+id);

      return successOnFindOne(workoutSheet);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: WorkoutSheetRequest) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    try {
      const dbResult = await this.service.update(Number(id), request);

      return successOnUpdate(dbResult);
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
