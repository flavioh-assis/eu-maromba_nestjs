import { Test, TestingModule } from '@nestjs/testing';
import { MuscleGroupsController } from './muscleGroups.controller';
import { MuscleGroupsService } from './muscleGroups.service';

describe('MuscleGroupsController', () => {
  let app: TestingModule;
  let controller: MuscleGroupsController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MuscleGroupsController],
      providers: [MuscleGroupsService],
    }).compile();

    controller = app.get(MuscleGroupsController);
  });

  describe('findAll', () => {
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
      it(`should return "${group.name}"`, async () => {
        const response = await controller.findAll();

        expect(response).toContainEqual(group);
      });
    });

    it(`should return an array ${expectedLength} items long`, async () => {
      const response = await controller.findAll();

      expect(response).toHaveLength(expectedLength);
    });
  });
});
