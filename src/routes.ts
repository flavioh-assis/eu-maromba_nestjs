import { Routes } from '@nestjs/core';
import { ExerciseModule } from 'modules/exercise/exercise.module';
import { TrainingModule } from 'modules/training/training.module';
import { RoutineModule } from 'modules/routine/routine.module';
import { MuscleGroupModule } from 'modules/muscle-group/muscle-group.module';

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
    path: 'routines',
    module: RoutineModule,
    children: [
      {
        path: ':routineId/trainings',
        module: TrainingModule,
      },
    ],
  },
];
