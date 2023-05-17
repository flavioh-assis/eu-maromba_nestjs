export interface TrainingResponse {
  readonly id: number;
  readonly exercise: {
    id: number;
    name: string;
  };
  readonly routine: {
    id: number;
  };
  readonly sets: number;
  readonly reps: number;
  readonly restTime: number;
  readonly obs: string;
  readonly position: number;
}
