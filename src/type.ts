import { MuscleGroupResponse } from './muscleGroup/type/muscleGroup.response';
import { TrainingResponse } from './training/type/training.response';

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

export type WorkoutSheetResponse = {
  id: number;
  name: string;
  trainings: TrainingResponse[];
};
