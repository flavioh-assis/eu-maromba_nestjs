import { Exercise, MuscleGroup } from '.prisma/client';

const abs = { id: 1, name: 'Abdomen' };
const arms = { id: 2, name: 'Braços' };
const back = { id: 3, name: 'Costas' };
const shoulders = { id: 4, name: 'Ombros' };
const chest = { id: 5, name: 'Peitoral' };
const legs = { id: 6, name: 'Pernas' };
const cardio = { id: 7, name: 'Cardio' };

export const muscleGroups: MuscleGroup[] = [
  abs,
  arms,
  back,
  shoulders,
  chest,
  legs,
  cardio,
];

export const exercises: Exercise[] = [
  { id: 1, name: 'Abdominal Reto', muscleGroupId: abs.id },
  { id: 2, name: 'Rosca Direta', muscleGroupId: arms.id },
  { id: 3, name: 'Barra Fixa', muscleGroupId: back.id },
  { id: 4, name: 'Elevação Lateral', muscleGroupId: shoulders.id },
  { id: 5, name: 'Supino Reto', muscleGroupId: chest.id },
  { id: 6, name: 'Leg Press', muscleGroupId: legs.id },
  { id: 7, name: 'Pular Corda', muscleGroupId: cardio.id },
];
