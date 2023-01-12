import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

describe('ExerciseController', () => {
  let app: TestingModule;
  let controller: ExerciseController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [ExerciseService],
    }).compile();

    controller = app.get(ExerciseController);
  });

  describe('findAll', () => {
    const expectedLength = 7;

    it(`should return an array ${expectedLength} items long`, async () => {
      const response = await controller.findAll();

      expect(response).toHaveLength(expectedLength);
    });
  });
});
