import { IsNumber, Min } from 'class-validator';

export class ExerciseDto {
  @IsNumber()
  @Min(1)
  id!: number;
}
