import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkoutSheetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Inferiores',
  })
  name!: string;
}
