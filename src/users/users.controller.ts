import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/middlewares/exception.filter';
import { GetUsersDto } from './dto/get-users.dto';
import { filter } from 'rxjs';
import { PageDto } from 'src/dto/page.dto';

@ApiTags('Users')
@ApiSecurity("Authorization", ["Authorization"])
@Controller('users')
//@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiBody({ required: true, description: "Фильтр с пагинацией", type: GetUsersDto  })
  @ApiResponse({ status: HttpStatus.OK, description: "Получен список пользователей", type: UserDto, isArray: true })
  async getUsers(@Body() filter: GetUsersDto): Promise<PageDto<UserDto>> {
    return await this.usersService.getUsers(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: "Получение пользователя по идентификатору" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Получены данные пользователя", type: UserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Пользователь не найден"})
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto>  {
    return await this.usersService.getUserById(id);
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
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Удаление пользователя" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Пользователь удален"})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Пользователь не найден"})
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }
}
