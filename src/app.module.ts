import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { ExerciseModule } from 'modules/exercise/exercise.module';
import { MuscleGroupModule } from 'modules/muscle-group/muscle-group.module';
import { TrainingModule } from 'modules/training/training.module';
import { RoutineModule } from 'modules/routine/routine.module';

@Module({
  imports: [
    RouterModule.register(routes),
    MuscleGroupModule,
    ExerciseModule,
    TrainingModule,
    RoutineModule,
  ],
})
export class AppModule {}
