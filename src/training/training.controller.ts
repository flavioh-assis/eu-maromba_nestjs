import { Body, Controller, Get, Post } from '@nestjs/common';
import { Training } from '@prisma/client';
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
}
