import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateWorkoutSheetDto {
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  name!: string;
}

export class EditWorkoutSheetDto extends CreateWorkoutSheetDto {}

export class ReorderWorkoutSheetDto {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  id!: number;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  position!: number;
}
