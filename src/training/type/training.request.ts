export type CreateTrainingRequest = {
  exercise: {
    id: number;
  };
  sets: number;
  reps: number;
  restTime: number;
  obs: string;
};

export type EditTrainingRequest = {
  workoutSheet: {
    id: number;
  };
  sets: number;
  reps: number;
  restTime: number;
  obs: string;
};

export type ReorderTrainingRequest = {
  id: number;
  position: number;
};
