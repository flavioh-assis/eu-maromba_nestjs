import { Routes } from '@nestjs/core';
import { ExerciseModule } from './exercise/exercise.module';
import { TrainingModule } from './training/training.module';
import { WorkoutSheetModule } from './workout-sheet/workout-sheet.module';
import { MuscleGroupModule } from './muscle-group/muscle-group.module';

export const routes: Routes = [
  {
    path: 'muscle-groups',
    module: MuscleGroupModule,
    children: [
      {
        path: ':muscleGroupId/exercises',
        module: ExerciseModule,
      },
    ],
  },
  {
    path: 'workout-sheets',
    module: WorkoutSheetModule,
    children: [
      {
        path: ':workoutSheetId/trainings',
        module: TrainingModule,
      },
    ],
  },
];
