import { Module } from '@nestjs/common';
import { ExerciseModule } from './exercise/exercise.module';
import { MuscleGroupModule } from './muscle-group/muscle-group.module';
import { TrainingModule } from './training/training.module';
import { WorkoutSheetModule } from './workout-sheet/workout-sheet.module';

@Module({
  imports: [MuscleGroupModule, ExerciseModule, TrainingModule, WorkoutSheetModule],
})
export class AppModule {}
