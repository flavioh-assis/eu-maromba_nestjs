export type TrainingResponse = {
  id: number;
  exercise: {
    id: number;
    name: string;
  };
  workoutSheet: {
    id: number;
    name: string;
  };
  sets: number;
  reps: number;
  restTime: number;
  obs: string;
};
