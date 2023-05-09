import { Module } from '@nestjs/common';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';
import { TrainingService } from 'training/training.service';

@Module({
  controllers: [RoutineController],
  providers: [TrainingService, RoutineService],
})
export class RoutineModule {}
