import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
  ParseArrayPipe,
  HttpCode,
} from '@nestjs/common';
import { mapTrainingUpdate, mapTrainingCreate } from './training.mapper';
import { TrainingService } from './training.service';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ExerciseService } from 'exercise/exercise.service';
import { RoutineService } from 'routine/routine.service';
import { ReorderTrainingDto } from './dto/reorder-training.dto';
import { CreateTrainingDto } from './dto/create-training.dto';

@ApiTags('Training')
@Controller()
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
    private readonly exerciseService: ExerciseService,
    private readonly routineService: RoutineService
  ) {}

  @Post()
  async create(@Param('routineId') routineId: number, @Body() dto: CreateTrainingDto) {
    const routineInDB = await this.routineService.findOne(routineId);
    if (!routineInDB) {
      return new BadRequestException('Routine does not exist.');
    }

    const exerciseInDB = await this.exerciseService.findOne(dto.exercise.id);
    if (!exerciseInDB) {
      return new BadRequestException('Exercise does not exist.');
    }

    const lastPosition = await this.trainingService.findLastPosition(routineId);
    const mappedTraining = mapTrainingCreate(dto, routineId, lastPosition + 1);

    return await this.trainingService.create(mappedTraining);
  }

  @Get()
  async findAllInRoutine(@Param('routineId') routineId: number) {
    return await this.trainingService.findAllByRoutineId(routineId);
  }

  @Patch()
  @ApiBody({
    type: ReorderTrainingDto,
    isArray: true,
    examples: {
      multiple: {
        value: [
          { id: 1, position: 2 },
          { id: 2, position: 1 },
        ],
      },
    },
  })
  async reorder(
    @Body(
      new ParseArrayPipe({
        items: ReorderTrainingDto,
        whitelist: true,
      })
    )
    dto: ReorderTrainingDto[]
  ) {
    const validTrainings = await Promise.all(
      dto.map(async training => {
        return await this.trainingService.findOne(training.id);
      })
    );

    if (validTrainings.some(t => t == null)) {
      return new BadRequestException('One or more trainings do not exist.');
    }

    const dbResult = await Promise.all(
      dto.map(async training => {
        return await this.trainingService.update(training.id, training);
      })
    );

    const trainingsOrderedByPosition = dbResult.sort((a, b) => a.position - b.position);

    return trainingsOrderedByPosition;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateTrainingDto) {
    const trainingInDB = await this.trainingService.findOne(id);

    if (!trainingInDB) return new BadRequestException('Training does not exist.');

    if (dto.exercise) {
      const exerciseInDB = await this.exerciseService.findOne(dto.exercise.id);

      if (!exerciseInDB) {
        return new BadRequestException('Exercise does not exist.');
      }
    }

    if (dto.routine) {
      const routineInDB = await this.routineService.findOne(dto.routine.id);

      if (!routineInDB) {
        return new BadRequestException('Routine does not exist.');
      }
    }

    const mappedTraining = mapTrainingUpdate(dto);

    if (dto.routine?.id && trainingInDB.routine.id !== mappedTraining.routineId) {
      const lastPositionInRoutine = await this.trainingService.findLastPosition(
        Number(mappedTraining.routineId)
      );

      mappedTraining.position = lastPositionInRoutine + 1;
    }

    return await this.trainingService.update(id, mappedTraining);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const trainingInDB = await this.trainingService.findOne(id);

    if (!trainingInDB) {
      return new BadRequestException('Training does not exist.');
    }

    await this.trainingService.delete(id);
  }
}
