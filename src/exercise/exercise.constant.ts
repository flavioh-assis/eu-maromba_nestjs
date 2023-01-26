export const selectExerciseResponse = {
  id: true,
  name: true,
  muscleGroup: {
    select: {
      id: true,
      name: true,
    },
  },
};
