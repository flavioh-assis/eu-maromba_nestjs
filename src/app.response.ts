import { Exercise, MuscleGroup, Training, WorkoutSheet } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';

type RequestResponse = {
  success: boolean;
  statusCode: number;
  statusText: string;
  data: Exercise[] | MuscleGroup[] | Training[] | WorkoutSheet[];
};

enum Code {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  InternalErrorServer = 500,
}

enum Text {
  Created = 'Successfully created.',
  Found = 'Successfully found.',
  NotCreated = 'Error on create.',
  NotFound = 'Error on find.',
}

export function errorOnCreate(error: PrismaClientUnknownRequestError) {
  return {
    success: false,
    statusCode: Code.InternalErrorServer,
    statusText: `${Text.NotCreated} ${error.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnFind(error: PrismaClientUnknownRequestError) {
  return {
    success: false,
    statusCode: Code.InternalErrorServer,
    statusText: `${Text.NotFound} ${error.message}`,
    data: [],
  } as RequestResponse;
}

export function successOnCreate(
  data: Exercise[] | MuscleGroup[] | Training[] | WorkoutSheet[]
) {
  return {
    success: true,
    statusCode: Code.Created,
    statusText: Text.Created,
    data,
  } as RequestResponse;
}

export function successOnFind(
  data: Exercise[] | MuscleGroup[] | Training[] | WorkoutSheet[]
) {
  return {
    success: true,
    statusCode: Code.Ok,
    statusText: Text.Found,
    data,
  } as RequestResponse;
}
