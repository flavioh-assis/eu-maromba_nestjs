import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateWorkoutSheetDto {
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  name: string;

  constructor() {
    this.name = '';
  }
}

export class EditWorkoutSheetDto extends CreateWorkoutSheetDto {}
