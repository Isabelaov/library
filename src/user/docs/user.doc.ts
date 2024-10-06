import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';

export function CreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create user' }),
    ApiResponse({ status: 201, description: 'User created' }),
    ApiBody({ type: CreateUserDto }),
  );
}

export function FindOneUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Get one user by ID, name or email' }),
    ApiQuery({
      type: String,
      description: 'User ID',
      name: 'id',
      required: false,
    }),
    ApiQuery({ name: 'email', type: String, required: false }),
    ApiQuery({ name: 'name', type: String, required: false }),
  );
}
