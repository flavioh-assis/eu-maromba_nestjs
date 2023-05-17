import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TrainingService } from './training.service';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ReorderTrainingDto,
  reorderApiBodyOptions,
  reorderArrayValidator,
} from './dto/reorder-training.dto';
import { CreateTrainingDto } from './dto/create-training.dto';

@ApiTags('Training')
@Controller()
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  async create(
    @Param('routineId', ParseIntPipe) routineId: number,
    @Body() dto: CreateTrainingDto
  ) {
    return await this.trainingService.create(routineId, dto);
  }

  @Get()
  async findAllInRoutine(@Param('routineId', ParseIntPipe) routineId: number) {
    return await this.trainingService.findAllByRoutine(routineId);
  }

  @Patch()
  @ApiBody(reorderApiBodyOptions)
  async reorder(
    @Body(reorderArrayValidator)
    dto: ReorderTrainingDto[]
  ) {
    return await this.trainingService.reorder(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTrainingDto) {
    return await this.trainingService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.trainingService.delete(id);
  }
}
