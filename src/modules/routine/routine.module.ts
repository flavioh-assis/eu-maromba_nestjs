import { Module } from '@nestjs/common';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';
import { RoutineRepository } from './routine.repository';
import { PrismaModule } from '@database/prisma.module';
import { TrainingRepository } from '@training/training.repository';
import { ExerciseRepository } from '@exercise/exercise.repository';

@Module({
  controllers: [RoutineController],
  imports: [PrismaModule],
  providers: [RoutineService, RoutineRepository, TrainingRepository, ExerciseRepository],
})
export class RoutineModule {}
