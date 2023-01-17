import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { errorOnValidate } from 'src/app.response';
import { validateId } from 'src/app.validator';
import { WorkoutSheetService } from './workoutSheet.service';

@Controller('api/workout-sheets')
export class WorkoutSheetController {
  constructor(private readonly service: WorkoutSheetService) {}

  @Post()
  @HttpCode(201)
  async create(@Body('name') name: string) {
    return this.service.create(name);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('name') name: string) {
    if (!validateId(id)) return errorOnValidate(`Id {${id}} is not valid.`);

    return this.service.update(id, name);
  }
}
