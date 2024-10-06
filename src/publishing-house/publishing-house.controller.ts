import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PublishingHouseService } from './publishing-house.service';
import { CreatePublishingHouseDto } from './dto/create-publishing-house.dto';
import { UpdatePublishingHouseDto } from './dto/update-publishing-house.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Publishing Houses')
@Controller('publishing-house')
export class PublishingHouseController {
  constructor(
    private readonly publishingHouseService: PublishingHouseService,
  ) {}

  @Post()
  create(@Body() createPublishingHouseDto: CreatePublishingHouseDto) {
    return this.publishingHouseService.create(createPublishingHouseDto);
  }

  @Get()
  findAll() {
    return this.publishingHouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishingHouseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublishingHouseDto: UpdatePublishingHouseDto,
  ) {
    return this.publishingHouseService.update(+id, updatePublishingHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishingHouseService.remove(+id);
  }
}
