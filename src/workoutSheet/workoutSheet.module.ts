import { Module } from '@nestjs/common';
import { WorkoutSheetController } from './workoutSheet.controller';
import { WorkoutSheetService } from './workoutSheet.service';

@Module({
  controllers: [WorkoutSheetController],
  providers: [WorkoutSheetService],
})
export class WorkoutSheetModule {}
