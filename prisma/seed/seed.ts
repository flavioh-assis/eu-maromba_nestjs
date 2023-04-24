import { Exercise, MuscleGroup, PrismaClient } from '@prisma/client';
import { exercises, muscleGroups } from '../seed/constant';

const prisma = new PrismaClient();

async function seed() {
  await seedMuscleGroups(muscleGroups);
  await seedExercises(exercises);
}

async function seedMuscleGroups(muscleGroups: MuscleGroup[]) {
  muscleGroups.forEach(async group => {
    await prisma.muscleGroup.upsert({
      where: { id: group.id },
      update: { name: group.name },
      create: { id: group.id, name: group.name },
    });
  });

  console.log('Added muscle group data!');
}

async function seedExercises(exercises: Exercise[]) {
  exercises.forEach(async group => {
    await prisma.exercise.upsert({
      where: {
        id: group.id,
      },
      update: {
        name: group.name,
        muscleGroupId: group.muscleGroupId,
      },
      create: {
        id: group.id,
        name: group.name,
        muscleGroupId: group.muscleGroupId,
      },
    });
  });

  console.log('Added exercise data!');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
