export type TrainingResponse = {
  id: number;
  exercise: {
    id: number;
    name: string;
  };
  workoutSheet: {
    id: number;
  };
  sets: number;
  reps: number;
  restTime: number;
  obs: string;
  position: number;
};
