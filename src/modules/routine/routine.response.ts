import { RoutineDbResult } from '@database/interfaces/routine.result';

export class RoutineResponse {
  readonly id: number;
  readonly title: string;
  readonly position: number;
  readonly trainingCount: number;

  constructor({ id, name, position, _count }: RoutineDbResult) {
    this.id = id;
    this.title = name;
    this.position = position;
    this.trainingCount = _count.trainings;
  }
}
