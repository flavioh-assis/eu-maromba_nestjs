import { ExerciseDbResult } from 'database/interfaces/exercise.result';

export class ExerciseResponse {
  readonly id: number;
  readonly name: string;
  readonly muscleGroupId?: number;

  constructor({ id, name, muscleGroupId }: ExerciseDbResult) {
    this.id = id;
    this.name = name;
    this.muscleGroupId = muscleGroupId;
  }
}
