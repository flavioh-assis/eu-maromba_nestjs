import { Test, TestingModule } from '@nestjs/testing';
import { RoutineController } from '../routine.controller';

describe('Routine Controller', () => {
  let controller = RoutineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutineController],
    }).compile();
    controller = module.get(RoutineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
