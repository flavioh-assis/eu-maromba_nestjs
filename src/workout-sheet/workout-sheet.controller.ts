import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkoutSheetService } from './workout-sheet.service';
import { WorkoutSheetBuilder } from './builder/workout-sheet.builder';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateWorkoutSheetDto } from './dto/create-workout-sheet.dto';
import { ReorderWorkoutSheetDto } from './dto/reorder-workout-sheet.dto';
import { UpdateWorkoutSheetDto } from './dto/update-workout-sheet.dto';
import { TrainingService } from 'training/training.service';

@ApiTags('Workout Sheet')
@Controller()
export class WorkoutSheetController {
  constructor(
    private readonly service: WorkoutSheetService,
    private readonly trainingService: TrainingService
  ) {}

  @Post()
  async create(@Body() dto: CreateWorkoutSheetDto) {
    const lastPosition = await this.service.findLastPosition();

    const newWorkoutSheet = new WorkoutSheetBuilder()
      .setName(dto.name)
      .setPosition(lastPosition + 1)
      .build();

    return await this.service.create(newWorkoutSheet);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Patch()
  @ApiBody({
    type: ReorderWorkoutSheetDto,
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
        items: ReorderWorkoutSheetDto,
        whitelist: true,
      })
    )
    dto: ReorderWorkoutSheetDto[]
  ) {
    const validWorkoutSheets = await Promise.all(
      dto.map(async sheet => {
        return await this.service.findOne(sheet.id);
      })
    );

    if (validWorkoutSheets.some(ws => ws == null)) {
      return new BadRequestException('One or more workout sheets do not exist.');
    }

    const dbResult = await Promise.all(
      dto.map(async ws => {
        return await this.service.update(ws.id, ws);
      })
    );

    const workoutSheetsOrderedByPosition = dbResult.sort(
      (a, b) => a.position - b.position
    );

    return workoutSheetsOrderedByPosition;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateWorkoutSheetDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const exist = await this.service.findOne(id);

    if (!exist) {
      return new BadRequestException('Workout sheet does not exist.');
    }

    const trainings = await this.trainingService.findAllByWorkoutSheetId(id);

    if (trainings.length) {
      await this.trainingService.deleteManyByWorkoutSheetId(id);
    }

    await this.service.delete(id);
  }
}
