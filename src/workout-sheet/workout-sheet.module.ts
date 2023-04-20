import { Module } from '@nestjs/common';
import { WorkoutSheetController } from './workout-sheet.controller';
import { WorkoutSheetService } from './workout-sheet.service';
import { TrainingService } from 'training/training.service';

@Module({
  controllers: [WorkoutSheetController],
  providers: [TrainingService, WorkoutSheetService],
})
export class WorkoutSheetModule {}
