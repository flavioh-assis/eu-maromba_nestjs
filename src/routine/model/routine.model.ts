export class Routine {
  id!: number;
  name!: string;
  position!: number;

  constructor(name: string, position: number) {
    this.name = name;
    this.position = position;
  }
}
