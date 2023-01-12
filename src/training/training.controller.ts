import { Controller, Get } from '@nestjs/common';
import { TrainingService } from './training.service';

@Controller('api/trainings')
export class TrainingController {
  constructor(private readonly service: TrainingService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
