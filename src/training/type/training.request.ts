import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { ExerciseDto } from 'src/exercise/type/exercise.dto';
import { WorkoutSheetDto } from 'src/workout-sheet/type/workout-sheet.dto';

export class UpdateTrainingDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  sets?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  reps?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  restTime?: number;

  @IsOptional()
  @IsString()
  obs?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  exercise?: ExerciseDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkoutSheetDto)
  workoutSheet?: WorkoutSheetDto;
}

export class ReorderTrainingDto {
  @IsNumber()
  @Min(1)
  id!: number;

  @IsNumber()
  @Min(1)
  position!: number;
}

export class CreateTrainingDto {
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  exercise!: ExerciseDto;

  @IsNumber()
  @Min(1)
  sets!: number;

  @IsNumber()
  @Min(1)
  reps!: number;

  @IsNumber()
  @Min(1)
  restTime!: number;

  @IsOptional()
  @IsString()
  obs?: string;

  constructor() {
    this.obs = '';
  }
}
