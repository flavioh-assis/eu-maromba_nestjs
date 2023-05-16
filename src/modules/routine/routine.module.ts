import { Module } from '@nestjs/common';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';
import { TrainingService } from 'modules/training/training.service';
import { RoutineRepository } from './routine.repository';
import { PrismaModule } from 'database/prisma.module';

@Module({
  controllers: [RoutineController],
  imports: [PrismaModule],
  providers: [TrainingService, RoutineService, RoutineRepository],
})
export class RoutineModule {}
