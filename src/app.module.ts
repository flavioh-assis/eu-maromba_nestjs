import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise/exercise.controller';
import { ExerciseService } from './exercise/exercise.service';
import { MuscleGroupController } from './muscleGroup/muscleGroup.controller';
import { MuscleGroupService } from './muscleGroup/muscleGroup.service';
import { WorkoutSheetController } from './workoutSheet/workoutSheet.controller';
import { WorkoutSheetService } from './workoutSheet/workoutSheet.service';

@Module({
  imports: [],
  controllers: [ExerciseController, MuscleGroupController, WorkoutSheetController],
  providers: [ExerciseService, MuscleGroupService, WorkoutSheetService],
})
export class AppModule {}
