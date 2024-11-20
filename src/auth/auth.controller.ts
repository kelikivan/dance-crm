import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { Public } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Public()
  @Post('registration')
  @ApiOperation({ summary: "Регистрация нового пользователя" })
  @ApiBody({ required: true, description: "Данные для регистрации пользователя", type: CreateUserDto  })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Пользователь зарегистрирован"})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Пользователь уже существует"})
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: "Аутентификация пользователя" })
  @ApiBody({ required: true, description: "Телефон и пароль пользователя", type: SignInUserDto  })
  @ApiResponse({ status: HttpStatus.OK, description: "Пользователь аутентифицирован"})
  async signIn(@Body() signInDto: SignInUserDto) {
    return await this.authService.signIn(signInDto.phone, signInDto.password);
  }
}
