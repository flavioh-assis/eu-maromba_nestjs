import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { ExerciseService } from 'modules/exercise/exercise.service';
import { RoutineService } from 'modules/routine/routine.service';
import { RoutineRepository } from 'modules/routine/routine.repository';
import { PrismaService } from 'database/prisma.service';
import { ExerciseRepository } from 'modules/exercise/exercise.repository';

@Module({
  controllers: [TrainingController],
  providers: [
    TrainingService,
    ExerciseService,
    RoutineService,
    RoutineRepository,
    PrismaService,
    ExerciseRepository,
  ],
})
export class TrainingModule {}
