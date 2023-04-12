import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
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
  @ApiProperty({
    example: 1,
  })
  id!: number;

  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 2,
  })
  position!: number;
}

export class CreateTrainingDto {
  @IsDefined()
  @IsNumber()
  @Min(1)
  sets!: number;

  @IsDefined()
  @IsNumber()
  @Min(1)
  reps!: number;

  @IsDefined()
  @IsNumber()
  @Min(1)
  restTime!: number;

  @IsOptional()
  @IsString()
  obs?: string;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  exercise!: ExerciseDto;

  constructor() {
    this.obs = '';
  }
}
