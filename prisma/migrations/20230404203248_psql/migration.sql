-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "muscleGroupId" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSheet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "WorkoutSheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "workoutSheetId" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "restTime" INTEGER NOT NULL,
    "obs" VARCHAR(100) NOT NULL DEFAULT '',
    "position" INTEGER NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_workoutSheetId_fkey" FOREIGN KEY ("workoutSheetId") REFERENCES "WorkoutSheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
