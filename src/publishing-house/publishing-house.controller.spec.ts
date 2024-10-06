import { Test, TestingModule } from '@nestjs/testing';
import { PublishingHouseController } from './publishing-house.controller';
import { PublishingHouseService } from './publishing-house.service';

describe('PublishingHouseController', () => {
  let controller: PublishingHouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishingHouseController],
      providers: [PublishingHouseService],
    }).compile();

    controller = module.get<PublishingHouseController>(PublishingHouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
