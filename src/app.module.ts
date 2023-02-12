import { Module } from '@nestjs/common';
import { ExerciseModule } from './exercise/exercise.module';
import { MuscleGroupModule } from './muscleGroup/muscleGroup.module';
import { TrainingModule } from './training/training.module';
import { WorkoutSheetModule } from './workoutSheet/workoutSheet.module';

@Module({
  imports: [MuscleGroupModule, ExerciseModule, TrainingModule, WorkoutSheetModule],
})
export class AppModule {}
