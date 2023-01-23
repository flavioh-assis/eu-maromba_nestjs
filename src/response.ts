import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { MuscleGroupResponse } from './muscleGroup/type/muscleGroup.response';
import {
  ExerciseResponse,
  RequestResponse,
  TrainingResponse,
  WorkoutSheetResponse,
} from './type';

enum Code {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  InternalErrorServer = 500,
}

enum Text {
  BadRequest = 'Bad request.',
  Created = 'Resource created.',
  Deleted = 'Resource deleted.',
  Found = 'Resource found.',
  Updated = 'Resource updated.',
  NothingFound = 'No resource found.',
  NotCreated = 'Fail to create resource.',
  NotDeleted = 'Fail to delete resource.',
  NotFound = 'Fail to find resource.',
  NotUpdated = 'Fail to update resource.',
}

export function errorOnCreate(error: PrismaClientUnknownRequestError) {
  return {
    success: false,
    statusCode: Code.InternalErrorServer,
    statusText: `${Text.NotCreated} ${error.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnDelete(error: PrismaClientUnknownRequestError) {
  return {
    success: false,
    statusCode: Code.InternalErrorServer,
    statusText: `${Text.NotDeleted} ${error.message}`,
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

export function errorOnUpdate(error: PrismaClientUnknownRequestError) {
  return {
    success: false,
    statusCode: Code.InternalErrorServer,
    statusText: `${Text.NotUpdated} ${error.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnValidate(error: string) {
  return {
    success: false,
    statusCode: Code.BadRequest,
    statusText: `${Text.BadRequest} ${error}`,
    data: [],
  } as RequestResponse;
}

export function successOnCreate(
  data: ExerciseResponse | TrainingResponse | WorkoutSheetResponse
) {
  return {
    success: true,
    statusCode: Code.Created,
    statusText: Text.Created,
    data: [data],
  } as RequestResponse;
}

export function successOnDelete(
  data: ExerciseResponse | TrainingResponse | WorkoutSheetResponse
) {
  return {
    success: true,
    statusCode: Code.NoContent,
    statusText: Text.Deleted,
    data: [data],
  } as RequestResponse;
}

export function successOnFindOne(
  data:
    | ExerciseResponse
    | MuscleGroupResponse
    | TrainingResponse
    | WorkoutSheetResponse
    | null
) {
  return {
    success: true,
    statusCode: data ? Code.Ok : Code.NoContent,
    statusText: data ? Text.Found : Text.NothingFound,
    data: data ? [data] : [],
  } as RequestResponse;
}

export function successOnFindMany(
  data:
    | ExerciseResponse[]
    | MuscleGroupResponse[]
    | TrainingResponse[]
    | WorkoutSheetResponse[]
) {
  return {
    success: true,
    statusCode: data.length ? Code.Ok : Code.NoContent,
    statusText: data.length ? Text.Found : Text.NothingFound,
    data,
  } as RequestResponse;
}

export function successOnUpdate(
  data: ExerciseResponse | TrainingResponse | WorkoutSheetResponse
) {
  return {
    success: true,
    statusCode: Code.NoContent,
    statusText: Text.Updated,
    data: [data],
  } as RequestResponse;
}
