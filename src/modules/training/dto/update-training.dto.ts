import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { ExerciseIdDto } from 'modules/exercise/dto/exercise-id.dto';
import { RoutineIdDto } from 'modules/routine/dto/routine-id.dto';

export class UpdateTrainingDto {
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    example: 4,
  })
  sets!: number;

  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    example: 8,
  })
  reps!: number;

  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    example: 90,
  })
  restTime!: number;

  @IsString()
  @ApiPropertyOptional({
    example: 'Slow reps',
  })
  obs!: string;

  @ValidateNested({ each: true })
  @ApiPropertyOptional()
  @Type(() => ExerciseIdDto)
  exercise!: ExerciseIdDto;

  @ValidateNested({ each: true })
  @ApiPropertyOptional()
  @Type(() => RoutineIdDto)
  routine!: RoutineIdDto;
}
