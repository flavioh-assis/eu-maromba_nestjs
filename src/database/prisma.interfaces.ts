export interface RoutineDbResult {
  readonly id: number;
  readonly name: string;
  readonly position: number;
  readonly _count: {
    trainings: number;
  };
}
