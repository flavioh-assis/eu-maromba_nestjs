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
} from '@nestjs/common';
import { mapTrainingUpdate, mapTrainingCreate } from './training.mapper';
import { TrainingService } from './training.service';
import {
  CreateTrainingRequest,
  ReorderTrainingDto,
  UpdateTrainingDto,
} from './type/training.request';
import { ApiTags } from '@nestjs/swagger';
import { ExerciseService } from 'src/exercise/exercise.service';
import { WorkoutSheetService } from 'src/workout-sheet/workout-sheet.service';

@ApiTags('Training')
@Controller('workout-sheets/:workoutSheetId/trainings')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
    private readonly exerciseService: ExerciseService,
    private readonly workoutSheetService: WorkoutSheetService
  ) {}

  @Post()
  async create(
    @Param('workoutSheetId') workoutSheetId: number,
    @Body() training: CreateTrainingRequest
  ) {
    const lastPosition = await this.trainingService.findLastPosition(workoutSheetId);

    const mappedTraining = mapTrainingCreate(
      training,
      Number(workoutSheetId),
      lastPosition + 1
    );

    return await this.trainingService.create(mappedTraining);
  }

  @Get()
  async findAll(@Param('workoutSheetId') workoutSheetId: number) {
    return await this.trainingService.findAll(workoutSheetId);
  }

  @Patch()
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
      return new BadRequestException('One or more training does not exist.');
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
  async update(@Param('id') id: number, @Body() training: UpdateTrainingDto) {
    const trainingInDB = await this.trainingService.findOne(id);

    if (!trainingInDB) {
      return new BadRequestException('Training does not exist.');
    }

    if (training?.exercise) {
      const exerciseInDB = await this.exerciseService.findOne(training.exercise.id);

      if (!exerciseInDB) {
        return new BadRequestException('Exercise does not exist.');
      }
    }

    if (training?.workoutSheet) {
      const workoutSheetInDB = await this.workoutSheetService.findOne(
        training.workoutSheet.id
      );

      if (!workoutSheetInDB) {
        return new BadRequestException('Workout sheet does not exist.');
      }
    }

    const mappedTraining = mapTrainingUpdate(training);

    if (
      training?.workoutSheet?.id &&
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
  async delete(@Param('id') id: number) {
    const exerciseInDB = await this.exerciseService.findOne(id);

    if (!exerciseInDB) {
      return new BadRequestException('Exercise does not exist.');
    }

    return await this.trainingService.delete(id);
  }
}
