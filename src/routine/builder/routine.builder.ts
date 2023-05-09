import { Routine } from '../model/routine.model';

export class RoutineBuilder {
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
    return new Routine(this.name, this.position);
  }
}
