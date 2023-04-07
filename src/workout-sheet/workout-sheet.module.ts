import { Module } from '@nestjs/common';
import { WorkoutSheetController } from './workout-sheet.controller';
import { WorkoutSheetService } from './workout-sheet.service';

@Module({
  controllers: [WorkoutSheetController],
  providers: [WorkoutSheetService],
})
export class WorkoutSheetModule {}
