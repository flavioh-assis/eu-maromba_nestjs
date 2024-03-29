import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  Min,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExerciseIdDto } from '@exercise/dto/exercise-id.dto';

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
  @Type(() => ExerciseIdDto)
  exercise!: ExerciseIdDto;
}
