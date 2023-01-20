import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import {
  errorOnCreate,
  errorOnDelete,
  errorOnFind,
  errorOnUpdate,
  successOnCreate,
  successOnDelete,
  successOnFindMany,
  successOnFindOne,
  successOnUpdate,
} from 'src/app.response';

const prisma = new PrismaClient();

@Injectable()
export class WorkoutSheetService {
  async create(name: string) {
    try {
      const response = await prisma.workoutSheet.create({
        data: {
          name,
        },
      });

      return successOnCreate(response);
    } catch (error) {
      console.log(error);

      return errorOnCreate(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll() {
    try {
      const response = await prisma.workoutSheet.findMany();

      return successOnFindMany(response);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }

  async findOne(id: number) {
    try {
      const response = await prisma.workoutSheet.findUnique({
        where: {
          id,
        },
      });

      return successOnFindOne(response);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(id: number, name: string) {
    try {
      const response = await prisma.workoutSheet.update({
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
      await prisma.$disconnect();
    }
  }

  async delete(id: number) {
    try {
      const response = await prisma.workoutSheet.delete({
        where: {
          id: id,
        },
      });

      return successOnDelete(response);
    } catch (error) {
      console.log(error);

      return errorOnDelete(error as PrismaClientUnknownRequestError);
    } finally {
      await prisma.$disconnect();
    }
  }
}
