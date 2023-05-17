import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { RoutineRepository } from 'modules/routine/routine.repository';
import { ExerciseRepository } from 'modules/exercise/exercise.repository';
import { PrismaModule } from 'database/prisma.module';
import { TrainingRepository } from './training.repository';

@Module({
  controllers: [TrainingController],
  providers: [TrainingService, RoutineRepository, ExerciseRepository, TrainingRepository],
  imports: [PrismaModule],
})
export class TrainingModule {}
