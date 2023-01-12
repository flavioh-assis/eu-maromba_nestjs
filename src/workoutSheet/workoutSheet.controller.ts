import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
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
}
