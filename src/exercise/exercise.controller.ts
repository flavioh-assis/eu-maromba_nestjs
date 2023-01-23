import { Controller, Get } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { successOnFindMany, errorOnFind } from 'src/response';
import { ExerciseService } from './exercise.service';

@Controller('api/exercises')
export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  @Get()
  async findAll() {
    try {
      const response = await this.service.findAll();

      return successOnFindMany(response);
    } catch (error) {
      console.log(error);

      return errorOnFind(error as PrismaClientUnknownRequestError);
    }
  }
}
