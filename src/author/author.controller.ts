import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: 'Create a new author' })
  @ApiBody({ type: CreateAuthorDto })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Get all authors' })
  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @ApiOperation({ summary: 'Get author by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @ApiOperation({ summary: 'Update author by ID' })
  @ApiBody({ type: UpdateAuthorDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }
}
