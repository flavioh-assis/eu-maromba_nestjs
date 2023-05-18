import { MuscleGroupDbResult } from '@database/interfaces/muscle-group.result';

export class MuscleGroupResponse {
  readonly id: number;
  readonly name: string;

  constructor({ id, name }: MuscleGroupDbResult) {
    this.id = id;
    this.name = name;
  }
}
