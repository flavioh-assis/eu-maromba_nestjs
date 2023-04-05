import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
import { CreateWorkoutSheetDto, EditWorkoutSheetDto } from './type/workoutSheet.dto';
import { WorkoutSheetService } from './workoutSheet.service';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('workout-sheets')
export class WorkoutSheetController {
  constructor(private readonly service: WorkoutSheetService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The workout sheet has been created.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async create(@Body() dto: CreateWorkoutSheetDto) {
    try {
      const dbResult = await this.service.create(dto);

      return dbResult;
    } catch (error) {
      console.error(error);

      return errorOnCreate(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const workoutSheets = await this.service.findAll();

      return successOnFindMany(workoutSheets);
    } catch (error) {
      console.error(error);

      return errorOnFind(error);
    }
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   if (!validateId(id)) {
  //     return errorOnValidate(`Id {${id}} is not valid.`);
  //   }

  //   try {
  //     const workoutSheet = await this.service.findOne(+id);

  //     return successOnFindOne(workoutSheet);
  //   } catch (error) {
  //     console.error(error);

  //     return errorOnFind(error);
  //   }
  // }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: EditWorkoutSheetDto) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    try {
      const dbResult = await this.service.update(Number(id), request);

      return successOnUpdate(dbResult);
    } catch (error) {
      console.error(error);

      return errorOnUpdate(error);
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
      console.error(error);

      return errorOnDelete(error);
    }
  }
}
