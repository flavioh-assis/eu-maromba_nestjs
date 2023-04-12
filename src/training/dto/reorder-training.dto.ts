import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

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
