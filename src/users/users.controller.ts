import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/middlewares/exception.filter';

@ApiTags('Users')
@ApiSecurity("Authorization", ["Authorization"])
@Controller('users')
//@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiParam({ name: "searchText", required: false, description: "Текст поиска" })
  @ApiResponse({ status: HttpStatus.OK, description: "Получен список пользователей", type: UserDto, isArray: true })
  async getUsers(@Param() searchText?: string): Promise<UserDto[]> {
    return this.usersService.getUsers(searchText)
  }

  @Get(':id')
  @ApiOperation({ summary: "Получение пользователя по идентификатору" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Получены данные пользователя", type: UserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Пользователь не найден"})
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto>  {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Обновление пользователя" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiBody({ required: true, description: "Данные для обновления пользователя", type: UpdateUserDto  })
  @ApiResponse({ status: HttpStatus.OK, description: "Пользователь обновлен"})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Пользователь не найден"})
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Удаление пользователя" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Пользователь удален"})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Пользователь не найден"})
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
