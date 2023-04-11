import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { ExerciseService } from 'src/exercise/exercise.service';
import { WorkoutSheetService } from 'src/workout-sheet/workout-sheet.service';

@Module({
  controllers: [TrainingController],
  providers: [TrainingService, ExerciseService, WorkoutSheetService],
})
export class TrainingModule {}
