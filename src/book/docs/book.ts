import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

export function GetAllBooks() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all books and apply filters' }),
    ApiQuery({
      name: 'date',
      required: false,
      type: String,
      description: 'Date of publication',
    }),
    ApiQuery({
      name: 'author',
      required: false,
      type: String,
      description: 'ID of author of books',
    }),
    ApiQuery({
      name: 'genre',
      required: false,
      type: String,
      description: 'ID of genre of books',
    }),
  );
}
