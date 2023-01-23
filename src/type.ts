import { MuscleGroupResponse } from './muscleGroup/type/muscleGroup.response';

export type RequestResponse = {
  success: boolean;
  statusCode: number;
  statusText: string;
  data:
    | ExerciseResponse[]
    | MuscleGroupResponse[]
    | TrainingResponse[]
    | WorkoutSheetResponse[];
};

export type ExerciseResponse = {
  id: number;
  name: string;
  muscleGroup: { id: number };
};

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
  sets: string;
  reps: string;
  restTime: string;
  obs: string;
};

export type WorkoutSheetResponse = {
  id: number;
  name: string;
  trainings: TrainingResponse[];
};
