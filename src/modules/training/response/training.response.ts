export class TrainingResponse {
  id!: number;
  exercise!: {
    id: number;
    name: string;
  };
  routine!: {
    id: number;
  };
  sets!: number;
  reps!: number;
  restTime!: number;
  obs!: string;
  position!: number;
}
