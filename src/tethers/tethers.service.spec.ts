import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TethersController } from './tethers.controller';
import { TethersService } from './tethers.service';

describe('TethersService', () => {
  let service: TethersService;

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

    service = module.get<TethersService>(TethersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
