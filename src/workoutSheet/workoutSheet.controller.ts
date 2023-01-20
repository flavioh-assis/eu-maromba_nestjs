import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { errorOnValidate } from 'src/app.response';
import { validateId } from 'src/app.validator';
import { WorkoutSheetService } from './workoutSheet.service';

@Controller('api/workout-sheets')
export class WorkoutSheetController {
  constructor(private readonly service: WorkoutSheetService) {}

  @Post()
  async create(@Body('name') name: string) {
    return this.service.create(name);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.service.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('name') name: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.service.update(Number(id), name);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.service.delete(Number(id));
  }
}
