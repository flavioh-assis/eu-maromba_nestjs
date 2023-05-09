import { Routine } from '@prisma/client';

export type RoutineResponse = {
  trainingCount: number;
} & Routine;
