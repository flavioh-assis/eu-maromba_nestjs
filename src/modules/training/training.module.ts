import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { ExerciseService } from 'modules/exercise/exercise.service';
import { RoutineService } from 'modules/routine/routine.service';
import { RoutineRepository } from 'modules/routine/routine.repository';
import { PrismaService } from 'database/prisma.service';

@Module({
  controllers: [TrainingController],
  providers: [
    TrainingService,
    ExerciseService,
    RoutineService,
    RoutineRepository,
    PrismaService,
  ],
})
export class TrainingModule {}
