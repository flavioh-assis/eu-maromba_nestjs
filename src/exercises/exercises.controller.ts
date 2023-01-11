import { Controller, Get } from '@nestjs/common';
import { ExercisesService } from './exercises.service';

@Controller('api/exercises')
export class ExercisesController {
  constructor(private readonly service: ExercisesService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
