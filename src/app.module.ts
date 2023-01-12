import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise/exercise.controller';
import { ExerciseService } from './exercise/exercise.service';
import { MuscleGroupController } from './muscleGroup/muscleGroup.controller';
import { MuscleGroupService } from './muscleGroup/muscleGroup.service';
import { TrainingController } from './training/training.controller';
import { TrainingService } from './training/training.service';
import { WorkoutSheetController } from './workoutSheet/workoutSheet.controller';
import { WorkoutSheetService } from './workoutSheet/workoutSheet.service';

@Module({
  imports: [],
  controllers: [
    ExerciseController,
    MuscleGroupController,
    TrainingController,
    WorkoutSheetController,
  ],
  providers: [ExerciseService, MuscleGroupService, TrainingService, WorkoutSheetService],
})
export class AppModule {}
