import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TethersController } from './tethers.controller';
import { TethersService } from './tethers.service';

describe('RatingsController', () => {
  let controller: TethersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TethersController],
      providers: [
        {
          provide: 'TetherRepository',
          useClass: Repository,
        },
        TethersService,
      ],
      exports: [TethersService],
    }).compile();

    controller = module.get<TethersController>(TethersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
