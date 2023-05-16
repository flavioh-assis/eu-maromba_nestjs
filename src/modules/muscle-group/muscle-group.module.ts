import { Module } from '@nestjs/common';
import { MuscleGroupController } from './muscle-group.controller';
import { MuscleGroupService } from './muscle-group.service';
import { PrismaModule } from 'database/prisma.module';
import { MuscleGroupRepository } from './muscle-group.repository';

@Module({
  controllers: [MuscleGroupController],
  providers: [MuscleGroupService, MuscleGroupRepository],
  imports: [PrismaModule],
})
export class MuscleGroupModule {}
