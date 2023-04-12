import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { ExerciseModule } from './exercise/exercise.module';
import { MuscleGroupModule } from './muscle-group/muscle-group.module';
import { TrainingModule } from './training/training.module';
import { WorkoutSheetModule } from './workout-sheet/workout-sheet.module';

@Module({
  imports: [
    RouterModule.register(routes),
    MuscleGroupModule,
    ExerciseModule,
    TrainingModule,
    WorkoutSheetModule,
  ],
})
export class AppModule {}
