import { Training } from '@prisma/client';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

export function mapTrainingUpdate(dto: UpdateTrainingDto) {
  const training = {
    sets: dto.sets,
    reps: dto.reps,
    restTime: dto.restTime,
    obs: dto.obs,
    routineId: dto.routine?.id,
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
  routineId: number,
  position: number
) {
  return {
    exerciseId: dto.exercise.id,
    sets: dto.sets,
    reps: dto.reps,
    restTime: dto.restTime,
    obs: dto.obs,
    routineId,
    position,
  } as Training;
}
