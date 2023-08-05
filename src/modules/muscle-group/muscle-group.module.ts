import { Module } from '@nestjs/common';
import { MuscleGroupController } from './muscle-group.controller';
import { MuscleGroupService } from './muscle-group.service';
import { PrismaModule } from '@database/prisma.module';
import { PrismaMuscleGroupRepository } from '../../repositories/prisma/muscle-group.repository';
import { MuscleGroupRepositoryInMemory } from '../../repositories/in-memory/muscle-group.in-memory';
import { ExerciseService } from '@exercise/exercise.service';
import { TrainingService } from '@training/training.service';
import { RoutineService } from '@routine/routine.service';
import { RoutineRepository } from '@routine/routine.repository';
import { ExerciseRepository } from '@exercise/exercise.repository';
import { TrainingRepository } from '@training/training.repository';
import { RoutineModule } from '@routine/routine.module';
import { ExerciseModule } from '@exercise/exercise.module';
import { TrainingModule } from '@training/training.module';

@Module({
  controllers: [MuscleGroupController],
  providers: [
    MuscleGroupService,
    // ExerciseService,
    // RoutineService,
    // TrainingService,
    PrismaMuscleGroupRepository,
    MuscleGroupRepositoryInMemory,
    // ExerciseRepository,
    // RoutineRepository,
    // TrainingRepository,
  ],
  imports: [PrismaModule, RoutineModule, ExerciseModule, TrainingModule],
  // components: []
})
export class MuscleGroupModule {}
