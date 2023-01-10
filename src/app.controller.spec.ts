import { Test, TestingModule } from '@nestjs/testing';
import { Exercise, MuscleGroup } from '@prisma/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let muscleGroupsResponse: MuscleGroup[];
  let exercisesResponse: Exercise[];

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get(AppController);
    muscleGroupsResponse = await appController.getAllMuscleGroups();
    exercisesResponse = await appController.getAllExercises();
  });

  describe('getAllMuscleGroups', () => {
    const abs = { id: 1, name: 'Abdomen' };
    const arms = { id: 2, name: 'Braços' };
    const back = { id: 3, name: 'Costas' };
    const shoulders = { id: 4, name: 'Ombros' };
    const chest = { id: 5, name: 'Peitoral' };
    const legs = { id: 6, name: 'Pernas' };
    const cardio = { id: 7, name: 'Cardio' };

    const muscleGroups = [abs, arms, back, shoulders, chest, legs, cardio];
    const expectedLength = muscleGroups.length;

    muscleGroups.forEach(group => {
      it(`should return "${group.name}"`, () => {
        expect(muscleGroupsResponse).toContainEqual(group);
      });
    });

    it(`should return an array ${expectedLength} items long`, async () => {
      expect(muscleGroupsResponse).toHaveLength(expectedLength);
    });
  });

  describe('getAllExercises', () => {
    const expectedLength = 7;

    it(`should return an array ${expectedLength} items long`, async () => {
      expect(exercisesResponse).toHaveLength(expectedLength);
    });
  });
});
