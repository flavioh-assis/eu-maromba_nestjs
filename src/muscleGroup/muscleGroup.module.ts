import { Module } from '@nestjs/common';
import { MuscleGroupController } from './muscleGroup.controller';
import { MuscleGroupService } from './muscleGroup.service';

@Module({
  controllers: [MuscleGroupController],
  providers: [MuscleGroupService],
})
export class MuscleGroupModule {}
