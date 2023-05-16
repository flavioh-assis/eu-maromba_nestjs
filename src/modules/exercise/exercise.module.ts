import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { PrismaModule } from 'database/prisma.module';
import { ExerciseRepository } from './exercise.repository';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseRepository],
  imports: [PrismaModule],
})
export class ExerciseModule {}
