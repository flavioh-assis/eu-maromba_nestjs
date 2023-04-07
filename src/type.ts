import { ExerciseResponse } from './exercise/type/exercise.response';
import { TrainingResponse } from './training/type/training.response';

export type RequestResponse = {
  success: boolean;
  statusCode: number;
  statusText: string;
  data: ExerciseResponse[] | TrainingResponse[];
};
