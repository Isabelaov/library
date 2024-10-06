import { Test, TestingModule } from '@nestjs/testing';
import { PublishingHouseService } from './publishing-house.service';

describe('PublishingHouseService', () => {
  let service: PublishingHouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublishingHouseService],
    }).compile();

    service = module.get<PublishingHouseService>(PublishingHouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
