import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Training } from '@prisma/client';
import { errorOnValidate } from 'src/app.response';
import { validateId } from 'src/app.validator';
import { TrainingService } from './training.service';

@Controller('api/trainings')
export class TrainingController {
  constructor(private readonly service: TrainingService) {}

  @Post()
  async create(@Body() training: Training) {
    return this.service.create(training);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() training: Training) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.service.update(Number(id), training);
  }
}
