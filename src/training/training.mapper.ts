import { Training } from '@prisma/client';
import { CreateTrainingRequest, EditTrainingRequest } from './type/training.request';

export function mapTrainingEdit(request: EditTrainingRequest) {
  return {
    workoutSheetId: request.workoutSheet.id,
    sets: request.sets,
    reps: request.reps,
    restTime: request.restTime,
    obs: request.obs,
  } as Training;
}

export function mapTrainingCreate(request: CreateTrainingRequest) {
  return {
    exerciseId: request.exercise.id,
    workoutSheetId: request.workoutSheet.id,
    sets: request.sets,
    reps: request.reps,
    restTime: request.restTime,
    obs: request.obs,
  } as Training;
}
