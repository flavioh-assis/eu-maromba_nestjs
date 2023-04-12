import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { ExerciseDto } from 'exercise/dto/exercise.dto';
import { WorkoutSheetDto } from 'workout-sheet/type/workout-sheet.dto';

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
