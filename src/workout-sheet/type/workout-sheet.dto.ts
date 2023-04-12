import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateWorkoutSheetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'A',
  })
  name!: string;
}

export class ReorderWorkoutSheetDto {
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

export class UpdateWorkoutSheetDto extends CreateWorkoutSheetDto {}

export class WorkoutSheetDto extends PickType(ReorderWorkoutSheetDto, ['id'] as const) {}
