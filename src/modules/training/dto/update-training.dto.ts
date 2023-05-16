import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { ExerciseIdDto } from 'modules/exercise/dto/exercise-id.dto';
import { RoutineIdDto } from 'modules/routine/dto/routine-id.dto';

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
  @Type(() => ExerciseIdDto)
  exercise?: ExerciseIdDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiPropertyOptional()
  @Type(() => RoutineIdDto)
  routine?: RoutineIdDto;
}
