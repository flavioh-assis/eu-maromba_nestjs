import { Training } from '@prisma/client';
import { CreateTrainingRequest } from './type/training.request';

export function mapTraining(request: CreateTrainingRequest) {
  return {
    exerciseId: request.exercise.id,
    workoutSheetId: request.workoutSheet.id,
    sets: request.sets,
    reps: request.reps,
    restTime: request.restTime,
    obs: request.obs,
  } as Training;
}
