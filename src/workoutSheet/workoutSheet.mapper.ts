import { WorkoutSheet } from '@prisma/client';
import { TrainingResponse } from 'src/training/type/training.response';
import { WorkoutSheetResponse } from './type/workoutSheet.response';

export function mapWorkoutSheetResponse(
  workoutSheets: WorkoutSheet[],
  trainings: TrainingResponse[]
) {
  let response: WorkoutSheetResponse[] = [];

  workoutSheets.forEach(ws => {
    const trainingsFromSheet = trainings.filter(t => t.workoutSheet.id === ws.id);

    response.push({ ...ws, trainings: [...trainingsFromSheet] });

    trainings = removePushedTrainings(trainings, trainingsFromSheet);
  });

  return response;
}

function removePushedTrainings(
  currentTrainings: TrainingResponse[],
  trainingsToBeRemoved: TrainingResponse[]
) {
  const trainingsRemaining = currentTrainings.filter(
    t => !trainingsToBeRemoved.includes(t)
  );

  return trainingsRemaining;
}
