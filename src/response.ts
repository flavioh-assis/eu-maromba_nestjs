import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { MuscleGroupResponse } from './muscleGroup/type/muscleGroup.response';
import { TrainingResponse } from './training/type/training.response';
import { RequestResponse } from './type';
import { HttpStatus } from '@nestjs/common/enums';
import { ExerciseResponse } from './exercise/type/exercise.response';

enum Text {
  BAD_REQUEST = 'Bad request.',
  CREATED = 'Resource created.',
  DELETED = 'Resource deleted.',
  FOUND = 'Resource found.',
  UPDATED = 'Resource updated.',
  NOTHING_FOUND = 'No resource found.',
  NOT_CREATED = 'Fail to create resource.',
  NOT_DELETED = 'Fail to delete resource.',
  NOT_FOUND = 'Fail to find resource.',
  NOT_UPDATED = 'Fail to update resource.',
}

export function errorOnCreate(error: unknown) {
  const prismaError = error as PrismaClientUnknownRequestError;

  return {
    success: false,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusText: `${Text.NOT_CREATED} ${prismaError.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnDelete(error: unknown) {
  const prismaError = error as PrismaClientUnknownRequestError;

  return {
    success: false,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusText: `${Text.NOT_DELETED} ${prismaError.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnFind(error: unknown) {
  const prismaError = error as PrismaClientUnknownRequestError;

  return {
    success: false,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusText: `${Text.NOT_FOUND} ${prismaError.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnUpdate(error: unknown) {
  const prismaError = error as PrismaClientUnknownRequestError;

  return {
    success: false,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusText: `${Text.NOT_UPDATED} ${prismaError.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnValidate(error: string) {
  return {
    success: false,
    statusCode: HttpStatus.BAD_REQUEST,
    statusText: `${Text.BAD_REQUEST} ${error}`,
    data: [],
  } as RequestResponse;
}

export function successOnCreate(data: ExerciseResponse | TrainingResponse) {
  return {
    success: true,
    statusCode: HttpStatus.CREATED,
    statusText: Text.CREATED,
    data: [data],
  } as RequestResponse;
}

export function successOnDelete(data: ExerciseResponse | TrainingResponse) {
  return {
    success: true,
    statusCode: HttpStatus.NO_CONTENT,
    statusText: Text.DELETED,
    data: [data],
  } as RequestResponse;
}

export function successOnFindOne(
  data: ExerciseResponse | MuscleGroupResponse | TrainingResponse | null
) {
  return {
    success: true,
    statusCode: data ? HttpStatus.OK : HttpStatus.NO_CONTENT,
    statusText: data ? Text.FOUND : Text.NOTHING_FOUND,
    data: data ? [data] : [],
  } as RequestResponse;
}

export function successOnFindMany(
  data: ExerciseResponse[] | MuscleGroupResponse[] | TrainingResponse[]
) {
  return {
    success: true,
    statusCode: data.length ? HttpStatus.OK : HttpStatus.NO_CONTENT,
    statusText: data.length ? Text.FOUND : Text.NOTHING_FOUND,
    data,
  } as RequestResponse;
}

export function successOnUpdate(
  data: ExerciseResponse | TrainingResponse | TrainingResponse[]
) {
  return {
    success: true,
    statusCode: HttpStatus.NO_CONTENT,
    statusText: Text.UPDATED,
    data: [data],
  } as RequestResponse;
}
