import { TrainingResponse } from 'src/training/type/training.response';

export type WorkoutSheetResponse = {
  id: number;
  name: string;
  position: number;
  trainings: TrainingResponse[];
};
