import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';

describe('RatingsService', () => {
  let service: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingsController],
      providers: [
        {
          provide: 'RatingRepository',
          useClass: Repository,
        },
        RatingsService,
      ],
      exports: [RatingsService],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
