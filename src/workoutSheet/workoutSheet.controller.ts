import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  errorOnDelete,
  errorOnUpdate,
  errorOnValidate,
  successOnDelete,
  successOnUpdate,
} from 'src/response';
import { validateId } from 'src/validator';
import { CreateWorkoutSheetDto, EditWorkoutSheetDto } from './type/workoutSheet.dto';
import { WorkoutSheetService } from './workoutSheet.service';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { WorkoutSheet } from '@prisma/client';

@Controller('workout-sheets')
export class WorkoutSheetController {
  constructor(private readonly service: WorkoutSheetService) {}

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  async create(@Body() dto: CreateWorkoutSheetDto) {
    const lastPosition = await this.service.findLastPosition();

    const newWorkoutSheet = {
      ...dto,
      position: lastPosition + 1,
    } as WorkoutSheet;

    return await this.service.create(newWorkoutSheet);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

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
