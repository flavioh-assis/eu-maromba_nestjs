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
    return await this.routineService.create(dto);
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
    return this.routineService.reorder(dto);
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
