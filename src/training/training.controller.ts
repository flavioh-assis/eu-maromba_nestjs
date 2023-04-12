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
import {
  CreateTrainingDto,
  ReorderTrainingDto,
  UpdateTrainingDto,
} from './type/training.request';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ExerciseService } from 'src/exercise/exercise.service';
import { WorkoutSheetService } from 'src/workout-sheet/workout-sheet.service';

@ApiTags('Training')
@Controller()
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
    private readonly exerciseService: ExerciseService,
    private readonly workoutSheetService: WorkoutSheetService
  ) {}

  @Post()
  async create(
    @Param('workoutSheetId') workoutSheetId: number,
    @Body() training: CreateTrainingDto
  ) {
    const workoutSheetInDB = await this.workoutSheetService.findOne(workoutSheetId);
    if (!workoutSheetInDB) {
      return new BadRequestException('Workout sheet does not exist.');
    }

    const exerciseInDB = await this.exerciseService.findOne(training.exercise.id);
    if (!exerciseInDB) {
      return new BadRequestException('Exercise does not exist.');
    }

    const lastPosition = await this.trainingService.findLastPosition(workoutSheetId);
    const mappedTraining = mapTrainingCreate(training, workoutSheetId, lastPosition + 1);

    return await this.trainingService.create(mappedTraining);
  }

  @Get()
  async findAll(@Param('workoutSheetId') workoutSheetId: number) {
    return await this.trainingService.findAll(workoutSheetId);
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

    if (dto?.exercise) {
      const exerciseInDB = await this.exerciseService.findOne(dto.exercise.id);

      if (!exerciseInDB) {
        return new BadRequestException('Exercise does not exist.');
      }
    }

    if (dto?.workoutSheet) {
      const workoutSheetInDB = await this.workoutSheetService.findOne(
        dto.workoutSheet.id
      );

      if (!workoutSheetInDB) {
        return new BadRequestException('Workout sheet does not exist.');
      }
    }

    const mappedTraining = mapTrainingUpdate(dto);

    if (
      dto?.workoutSheet?.id &&
      trainingInDB.workoutSheet.id !== mappedTraining.workoutSheetId
    ) {
      const lastPositionInWorkoutSheet = await this.trainingService.findLastPosition(
        Number(mappedTraining.workoutSheetId)
      );

      mappedTraining.position = lastPositionInWorkoutSheet + 1;
    }

    return await this.trainingService.update(Number(id), mappedTraining);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const exerciseInDB = await this.exerciseService.findOne(id);

    if (!exerciseInDB) {
      return new BadRequestException('Exercise does not exist.');
    }

    await this.trainingService.delete(id);
  }
}
