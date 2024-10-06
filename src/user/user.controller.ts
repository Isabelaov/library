import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUser, FindOneUser } from './docs/user.doc';
import { FindQueryDto, UpdateUserDto, CreateUserDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @CreateUser()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    console.log(req.user);

    return this.userService.findAll();
  }

  @FindOneUser()
  @Get('one')
  findOne(@Query() findQueryDto: FindQueryDto, @Query('id') id?: string) {
    return this.userService.findOne(findQueryDto, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
