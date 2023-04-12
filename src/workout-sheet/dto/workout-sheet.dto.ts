import { PickType } from '@nestjs/swagger';
import { ReorderWorkoutSheetDto } from './reorder-workout-sheet.dto';

export class WorkoutSheetDto extends PickType(ReorderWorkoutSheetDto, ['id'] as const) {}
