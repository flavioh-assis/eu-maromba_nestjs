import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

describe('ExercisesController', () => {
  let app: TestingModule;
  let controller: ExercisesController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ExercisesController],
      providers: [ExercisesService],
    }).compile();

    controller = app.get(ExercisesController);
  });

  describe('findAll', () => {
    const expectedLength = 7;

    it(`should return an array ${expectedLength} items long`, async () => {
      const response = await controller.findAll();

      expect(response).toHaveLength(expectedLength);
    });
  });
});
