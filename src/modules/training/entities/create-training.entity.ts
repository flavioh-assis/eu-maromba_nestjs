import { CreateTrainingDto } from '../dto/create-training.dto';

export class CreateTraining {
  readonly exerciseId: number;
  readonly routineId: number;
  readonly sets: number;
  readonly reps: number;
  readonly restTime: number;
  readonly obs: string;
  readonly position: number;

  constructor(
    { exercise, reps, restTime, sets, obs }: CreateTrainingDto,
    routineId: number,
    position: number
  ) {
    this.exerciseId = exercise.id;
    this.routineId = routineId;
    this.sets = sets;
    this.reps = reps;
    this.restTime = restTime;
    this.obs = obs || '';
    this.position = position;
  }
}
