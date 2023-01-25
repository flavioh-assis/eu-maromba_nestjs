import { Injectable } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { db } from 'src/db.connection';
import {
  errorOnDelete,
  errorOnFind,
  errorOnUpdate,
  successOnDelete,
  successOnFindOne,
  successOnUpdate,
} from 'src/response';

@Injectable()
export class WorkoutSheetService {
  async create(name: string) {
    return await db.workoutSheet.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return await db.workoutSheet.findMany();
  }

  async findOne(id: number) {
    try {
      const response = await db.workoutSheet.findUnique({
        where: {
          id,
        },
      });

      return successOnFindOne(response);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    } finally {
      await db.$disconnect();
    }
  }

  async update(id: number, name: string) {
    try {
      const response = await db.workoutSheet.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      return successOnUpdate(response);
    } catch (error) {
      console.log(error);

      return errorOnUpdate(error as PrismaClientUnknownRequestError);
    } finally {
      await db.$disconnect();
    }
  }

  async delete(id: number) {
    try {
      const response = await db.workoutSheet.delete({
        where: {
          id: id,
        },
      });

      return successOnDelete(response);
    } catch (error) {
      console.log(error);

      return errorOnDelete(error as PrismaClientUnknownRequestError);
    } finally {
      await db.$disconnect();
    }
  }
}
