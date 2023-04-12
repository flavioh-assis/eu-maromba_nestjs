export const selectTrainingResponse = {
  id: true,
  exercise: {
    select: {
      id: true,
      name: true,
    },
  },
  workoutSheet: {
    select: {
      id: true,
    },
  },
  sets: true,
  reps: true,
  restTime: true,
  obs: true,
  position: true,
};
