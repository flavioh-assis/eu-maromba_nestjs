import { ParseArrayPipe } from '@nestjs/common';
import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class ReorderTrainingDto {
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 1,
  })
  id!: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 0,
  })
  position!: number;
}

export const reorderApiBodyOptions: ApiBodyOptions = {
  type: ReorderTrainingDto,
  isArray: true,
  examples: {
    multiple: {
      value: [
        { id: 1, position: 1 },
        { id: 2, position: 0 },
      ],
    },
  },
};

export const reorderArrayValidator = new ParseArrayPipe({
  items: ReorderTrainingDto,
  whitelist: true,
});
