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
import {
  CreateWorkoutSheetDto,
  EditWorkoutSheetDto,
  ReorderWorkoutSheetDto,
} from './type/workout-sheet.dto';
import { WorkoutSheetService } from './workout-sheet.service';
import { WorkoutSheetBuilder } from './workout-sheet.builder';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Workout Sheet')
@Controller('workout-sheets')
export class WorkoutSheetController {
  constructor(private readonly service: WorkoutSheetService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateWorkoutSheetDto) {
    const lastPosition = await this.service.findLastPosition();

    const newWorkoutSheet = new WorkoutSheetBuilder()
      .setName(dto.name)
      .setPosition(lastPosition + 1)
      .build();

    return await this.service.create(newWorkoutSheet);
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.service.findAll();
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: number, @Body() dto: EditWorkoutSheetDto) {
    return await this.service.update(id, dto);
  }

  @Patch()
  @HttpCode(200)
  async reorder(
    @Body(
      new ParseArrayPipe({
        items: ReorderWorkoutSheetDto,
        whitelist: true,
      })
    )
    dto: ReorderWorkoutSheetDto[]
  ) {
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

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const exist = await this.service.findOne(id);

    if (!exist) {
      return new BadRequestException("Workout sheet doesn't exist.");
    }

    await this.service.delete(id);
  }
}
