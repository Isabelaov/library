import { Injectable } from '@nestjs/common';
import { CreatePublishingHouseDto } from './dto/create-publishing-house.dto';
import { UpdatePublishingHouseDto } from './dto/update-publishing-house.dto';

@Injectable()
export class PublishingHouseService {
  create(createPublishingHouseDto: CreatePublishingHouseDto) {
    return 'This action adds a new publishingHouse';
  }

  findAll() {
    return `This action returns all publishingHouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publishingHouse`;
  }

  update(id: number, updatePublishingHouseDto: UpdatePublishingHouseDto) {
    return `This action updates a #${id} publishingHouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} publishingHouse`;
  }
}
