import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoutineDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Inferiores',
  })
  title!: string;
}
