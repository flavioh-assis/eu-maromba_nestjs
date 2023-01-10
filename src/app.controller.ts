import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('muscleGroups')
  getAllMuscleGroups() {
    return this.appService.getMuscleGroups();
  }

  @Get('exercises')
  getAllExercises() {
    return this.appService.getExercises();
  }
}
