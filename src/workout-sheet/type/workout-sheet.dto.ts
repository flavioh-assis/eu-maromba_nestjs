import { PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateWorkoutSheetDto {
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  name!: string;
}

export class UpdateWorkoutSheetDto extends CreateWorkoutSheetDto {}

export class ReorderWorkoutSheetDto {
  @IsNumber()
  @Min(1)
  id!: number;

  @IsNumber()
  @Min(1)
  position!: number;
}

export class WorkoutSheetDto extends PickType(ReorderWorkoutSheetDto, ['id'] as const) {}
