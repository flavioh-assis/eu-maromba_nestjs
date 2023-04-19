import { WorkoutSheet } from '@prisma/client';

export type WorkoutSheetResponse = {
  trainingCount: number;
} & WorkoutSheet;
