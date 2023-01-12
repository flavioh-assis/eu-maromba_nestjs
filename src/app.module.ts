import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise/exercise.controller';
import { ExerciseService } from './exercise/exercise.service';
import { MuscleGroupController } from './muscleGroup/muscleGroup.controller';
import { MuscleGroupService } from './muscleGroup/muscleGroup.service';

@Module({
  imports: [],
  controllers: [ExerciseController, MuscleGroupController],
  providers: [ExerciseService, MuscleGroupService],
})
export class AppModule {}
