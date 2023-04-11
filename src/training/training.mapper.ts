import { Training } from '@prisma/client';
import { CreateTrainingRequest, UpdateTrainingDto } from './type/training.request';

export function mapTrainingUpdate(dto: UpdateTrainingDto) {
  const training = {
    sets: dto?.sets,
    reps: dto?.reps,
    restTime: dto?.restTime,
    obs: dto?.obs,
    workoutSheetId: dto?.workoutSheet?.id,
    exerciseId: dto?.exercise?.id,
  } as Training;

  (Object.keys(training) as (keyof Training)[]).forEach(key => {
    if (training[key] === undefined) {
      delete training[key];
    }
  });

  return training;
}

export function mapTrainingCreate(
  request: CreateTrainingRequest,
  workoutSheetId: number,
  position: number
) {
  return {
    exerciseId: request.exercise.id,
    sets: request.sets,
    reps: request.reps,
    restTime: request.restTime,
    obs: request.obs,
    workoutSheetId,
    position,
  } as Training;
}
