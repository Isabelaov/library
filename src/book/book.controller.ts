import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, GetBooksQueryDto, UpdateBookDto } from './dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllEvents } from './docs/book';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: CreateBookDto })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @GetAllEvents()
  @Get()
  findAll(@Query() query: GetBooksQueryDto) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
