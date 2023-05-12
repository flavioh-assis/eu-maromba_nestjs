import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { ExerciseService } from 'exercise/exercise.service';
import { RoutineService } from 'routine/routine.service';
import { RoutineRepository } from 'routine/routine.repository';
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
