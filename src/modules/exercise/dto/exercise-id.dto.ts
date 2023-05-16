import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class ExerciseIdDto {
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 1,
  })
  id!: number;
}
