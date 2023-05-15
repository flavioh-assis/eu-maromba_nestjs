import { Prisma } from '@prisma/client';

export const prismaRoutineSelect = {
  id: true,
  name: true,
  position: true,
  _count: {
    select: {
      trainings: true,
    },
  },
} as Required<Omit<Prisma.RoutineSelect, 'trainings'>>;
