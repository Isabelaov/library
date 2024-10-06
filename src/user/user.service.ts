import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { FindQueryDto, UpdateUserDto, CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, password, address, email, isAdmin } = createUserDto;

    const existingUser =
      (await this.userRepository.findOneBy({ name })) ||
      (await this.userRepository.findOneBy({ email }));

    if (existingUser)
      throw new BadRequestException('User already exists (email or name)');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: isAdmin ? UserRole.ADMIN : UserRole.USER,
    });

    await this.userRepository.save(newUser);

    return 'User created successfully';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(query: FindQueryDto, id?: string) {
    const { email, name } = query;
    if (id) {
      return await this.userRepository.findOneBy({ id });
    }

    if (email) {
      return await this.userRepository.findOneBy({ email });
    }

    if (name) {
      return await this.userRepository.findOneBy({ name });
    }

    throw new BadRequestException(
      'ID, email or name must be provided to search by',
    );
  }

  async findWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['password'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
