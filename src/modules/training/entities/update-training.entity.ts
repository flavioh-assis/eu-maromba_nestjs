import { UpdateTrainingDto } from '../dto/update-training.dto';

export class UpdateTraining {
  readonly exerciseId: number;
  readonly routineId: number;
  readonly sets: number;
  readonly reps: number;
  readonly restTime: number;
  readonly obs: string;

  constructor({ exercise, reps, restTime, sets, obs, routine }: UpdateTrainingDto) {
    this.exerciseId = exercise.id;
    this.routineId = routine.id;
    this.sets = sets;
    this.reps = reps;
    this.restTime = restTime;
    this.obs = obs;
  }
}
