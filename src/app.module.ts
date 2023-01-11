import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises/exercises.controller';
import { ExercisesService } from './exercises/exercises.service';
import { MuscleGroupsController } from './muscleGroups/muscleGroups.controller';
import { MuscleGroupsService } from './muscleGroups/muscleGroups.service';

@Module({
  imports: [],
  controllers: [ExercisesController, MuscleGroupsController],
  providers: [ExercisesService, MuscleGroupsService],
})
export class AppModule {}
