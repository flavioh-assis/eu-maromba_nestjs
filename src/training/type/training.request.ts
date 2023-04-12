import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateTrainingDto {
  @IsDefined()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 3,
  })
  sets!: number;

  @IsDefined()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 10,
  })
  reps!: number;

  @IsDefined()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 60,
  })
  restTime!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Drop-set 20% x3',
  })
  obs?: string;

  @IsDefined()
  @ValidateNested({ each: true })
  @ApiProperty()
  @Type(() => ExerciseDto)
  exercise!: ExerciseDto;
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

export class UpdateTrainingDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    example: 4,
  })
  sets?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    example: 8,
  })
  reps?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    example: 90,
  })
  restTime?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Slow reps',
  })
  obs?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiPropertyOptional()
  @Type(() => ExerciseDto)
  exercise?: ExerciseDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiPropertyOptional()
  @Type(() => WorkoutSheetDto)
  workoutSheet?: WorkoutSheetDto;
}
