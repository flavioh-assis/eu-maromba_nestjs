-- CreateTable
CREATE TABLE IF NOT EXISTS `MuscleGroup` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `Exercise` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `muscleGroupId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `Training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exerciseId` INTEGER NOT NULL,
    `workoutSheetId` INTEGER NOT NULL,
    `sets` INTEGER NOT NULL,
    `reps` INTEGER NOT NULL,
    `restTime` INTEGER NOT NULL,
    `obs` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `WorkoutSheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_muscleGroupId_fkey` FOREIGN KEY (`muscleGroupId`) REFERENCES `MuscleGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_workoutSheetId_fkey` FOREIGN KEY (`workoutSheetId`) REFERENCES `WorkoutSheet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

