import { Controller, Get } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('api/exercises')
export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
