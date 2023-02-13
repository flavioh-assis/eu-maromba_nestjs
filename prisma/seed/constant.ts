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
  { id: 1, name: 'Abdominal boxeador', muscleGroupId: abs.id },
  { id: 2, name: 'Abdominal canivete', muscleGroupId: abs.id },
  { id: 3, name: 'Abdominal canivete cruzado', muscleGroupId: abs.id },
  { id: 4, name: 'Abdominal com elevação do quadril na bola', muscleGroupId: abs.id },
  { id: 5, name: 'Abdominal com perna elevada', muscleGroupId: abs.id },
  { id: 6, name: 'Abdominal crunch na bola suíça', muscleGroupId: abs.id },
  { id: 7, name: 'Abdominal cruzado / bicicleta', muscleGroupId: abs.id },
  { id: 8, name: 'Abdominal em V', muscleGroupId: abs.id },
  { id: 9, name: 'Abdominal hipopressivo / stomach vacuum', muscleGroupId: abs.id },
  { id: 10, name: 'Abdominal infra', muscleGroupId: abs.id },
  { id: 11, name: 'Abdominal infra alternado ', muscleGroupId: abs.id },
  { id: 12, name: 'Abdominal infra escalador', muscleGroupId: abs.id },
  { id: 13, name: 'Abdominal infra no banco', muscleGroupId: abs.id },
  { id: 14, name: 'Abdominal na barra paralela', muscleGroupId: abs.id },
  { id: 15, name: 'Abdominal na roldana alta', muscleGroupId: abs.id },
  { id: 16, name: 'Abdominal oblíquo alternado', muscleGroupId: abs.id },
  { id: 17, name: 'Abdominal remador', muscleGroupId: abs.id },
  { id: 18, name: 'Abdominal reto / crunch', muscleGroupId: abs.id },
  { id: 19, name: 'Abdominal roll Up', muscleGroupId: abs.id },
  { id: 20, name: 'Abdominal russo', muscleGroupId: abs.id },
  { id: 21, name: 'Abdominal sprinter', muscleGroupId: abs.id },
  { id: 22, name: 'Flexão Homem-Aranha / Spider-Man', muscleGroupId: abs.id },
  { id: 23, name: 'Perdigueiro', muscleGroupId: abs.id },
  { id: 24, name: 'Prancha alta com rotação ', muscleGroupId: abs.id },
  { id: 25, name: 'Prancha com 2 apoios', muscleGroupId: abs.id },
  { id: 26, name: 'Prancha com bola', muscleGroupId: abs.id },
  { id: 27, name: 'Prancha com braços estendidos', muscleGroupId: abs.id },
  { id: 28, name: 'Prancha lateral', muscleGroupId: abs.id },
  { id: 29, name: 'Prancha paralela / isométrica', muscleGroupId: abs.id },
  { id: 30, name: 'Supra abdominal com joelhos flexionados', muscleGroupId: abs.id },
  { id: 31, name: 'Supra abdominal com membros inferiores 90°', muscleGroupId: abs.id },
];
