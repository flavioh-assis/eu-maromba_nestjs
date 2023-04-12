import { Training } from '@prisma/client';
import { CreateTrainingDto, UpdateTrainingDto } from './type/training.request';

export function mapTrainingUpdate(dto: UpdateTrainingDto) {
  const training = {
    sets: dto.sets,
    reps: dto.reps,
    restTime: dto.restTime,
    obs: dto.obs,
    workoutSheetId: dto.workoutSheet?.id,
    exerciseId: dto.exercise?.id,
  } as Training;

  (Object.keys(training) as (keyof Training)[]).forEach(key => {
    if (training[key] === undefined) {
      delete training[key];
    }
  });

  return training;
}

export function mapTrainingCreate(
  dto: CreateTrainingDto,
  workoutSheetId: number,
  position: number
) {
  return {
    exerciseId: dto.exercise.id,
    sets: dto.sets,
    reps: dto.reps,
    restTime: dto.restTime,
    obs: dto.obs,
    workoutSheetId,
    position,
  } as Training;
}
