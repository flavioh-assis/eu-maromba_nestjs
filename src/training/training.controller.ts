import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { errorOnCreate, errorOnValidate, successOnCreate } from 'src/response';
import { validateId } from 'src/validator';
import { mapTraining } from './training.mapper';
import { TrainingService } from './training.service';
import { CreateTrainingRequest, EditTrainingRequest } from './type/training.request';

@Controller('api/trainings')
export class TrainingController {
  constructor(private readonly service: TrainingService) {}

  @Post()
  async create(@Body() training: CreateTrainingRequest) {
    try {
      const mappedTraining = mapTraining(training);

      const dbResult = await this.service.create(mappedTraining);

      return successOnCreate(dbResult);
    } catch (error) {
      console.log(error);

      errorOnCreate(error as PrismaClientUnknownRequestError);
    }
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.service.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() training: EditTrainingDto) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.service.update(Number(id), training);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!validateId(id)) {
      return errorOnValidate(`Id {${id}} is not valid.`);
    }

    return this.service.delete(Number(id));
  }
}
