import { Controller, Get } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { successOnFindMany, errorOnFind } from 'src/response';
import { MuscleGroupService } from './muscleGroup.service';

@Controller('api/muscle-groups')
export class MuscleGroupController {
  constructor(private readonly service: MuscleGroupService) {}

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
