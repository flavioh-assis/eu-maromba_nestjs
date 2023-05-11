/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MuscleGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutSheet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_muscleGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_workoutSheetId_fkey";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "MuscleGroup";

-- DropTable
DROP TABLE "Training";

-- DropTable
DROP TABLE "WorkoutSheet";

-- CreateTable
CREATE TABLE "muscle_groups" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "muscle_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "muscleGroupId" INTEGER NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routines" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "routines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "routineId" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "restTime" INTEGER NOT NULL,
    "obs" VARCHAR(100) NOT NULL DEFAULT '',
    "position" INTEGER NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "muscle_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
