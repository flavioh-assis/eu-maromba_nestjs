import { PickType } from '@nestjs/swagger';
import { ReorderRoutineDto } from './reorder-routine.dto';

export class RoutineIdDto extends PickType(ReorderRoutineDto, ['id'] as const) {}
