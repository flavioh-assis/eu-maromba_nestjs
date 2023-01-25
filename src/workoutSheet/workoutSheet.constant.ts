import { selectTrainingResponse } from 'src/training/training.constant';

export const selectWorkoutResponse = {
  id: true,
  name: true,
  trainings: {
    select: selectTrainingResponse,
  },
};
