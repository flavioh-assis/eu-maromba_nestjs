import { Routes } from '@nestjs/core';
import { ExerciseModule } from '@exercise/exercise.module';
import { TrainingModule } from '@training/training.module';
import { RoutineModule } from '@routine/routine.module';
import { MuscleGroupModule } from '@muscle-group/muscle-group.module';

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
