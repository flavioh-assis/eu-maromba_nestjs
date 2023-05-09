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
import { RoutineService } from './routine.service';
import { RoutineBuilder } from './builder/routine.builder';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { ReorderRoutineDto } from './dto/reorder-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { TrainingService } from 'training/training.service';

@ApiTags('Routine')
@Controller()
export class RoutineController {
  constructor(
    private readonly routineService: RoutineService,
    private readonly trainingService: TrainingService
  ) {}

  @Post()
  async create(@Body() dto: CreateRoutineDto) {
    const lastPosition = await this.routineService.findLastPosition();

    const newRoutine = new RoutineBuilder()
      .setName(dto.name)
      .setPosition(lastPosition + 1)
      .build();

    return await this.routineService.create(newRoutine);
  }

  @Get()
  async findAll() {
    return await this.routineService.findAll();
  }

  @Patch()
  @ApiBody({
    type: ReorderRoutineDto,
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
        items: ReorderRoutineDto,
        whitelist: true,
      })
    )
    dto: ReorderRoutineDto[]
  ) {
    const validRoutines = await Promise.all(
      dto.map(async routine => {
        return await this.routineService.findOne(routine.id);
      })
    );

    if (validRoutines.some(routine => routine == null)) {
      return new BadRequestException('One or more routines do not exist.');
    }

    const dbResult = await Promise.all(
      dto.map(async routine => {
        return await this.routineService.update(routine.id, routine);
      })
    );

    const routinesOrderedByPosition = dbResult.sort((a, b) => a.position - b.position);

    return routinesOrderedByPosition;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateRoutineDto) {
    return await this.routineService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const exist = await this.routineService.findOne(id);

    if (!exist) {
      return new BadRequestException('Routine does not exist.');
    }

    const trainings = await this.trainingService.findAllByRoutineId(id);

    if (trainings.length) {
      await this.trainingService.deleteManyByRoutineId(id);
    }

    await this.routineService.delete(id);
  }
}
