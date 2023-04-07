import { WorkoutSheet } from './type/workout-sheet.model';

export class WorkoutSheetBuilder {
  private name!: string;
  private position!: number;

  setName(name: string) {
    this.name = name;
    return this;
  }

  setPosition(pos: number) {
    this.position = pos;
    return this;
  }

  build() {
    return new WorkoutSheet(this.name, this.position);
  }
}
