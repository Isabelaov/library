import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findWithPassword(email);

    if (!user) throw new BadRequestException('User does not exist');

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch)
      throw new BadRequestException('Passwords do not match');

    return this.login(user) || null;
  }

  async login(user: User) {
    const payload = { userId: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
