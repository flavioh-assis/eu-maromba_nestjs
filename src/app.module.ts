import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { ExerciseModule } from './exercise/exercise.module';
import { MuscleGroupModule } from './muscle-group/muscle-group.module';
import { TrainingModule } from './training/training.module';
import { RoutineModule } from './routine/routine.module';

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
