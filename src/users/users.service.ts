import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isNull } from 'util';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
        id: 1,
        telephone: '89030810397',
        name: 'Келик Иван',
        deleted: false,
        rightsText: 'ADMIN'
    },
    {
        id: 2,
        telephone: '89827133736',
        name: 'Келик Анна',
        deleted: true,
        rightsText: 'MANAGER'
    }
   ]

  addUser(createUserDto: CreateUserDto) {
    var maxId = this.users.reduce(
        (max, user) => (user.id > max ? user.id : max),
        this.users[0].id
      );
    
    var nextId = maxId + 1;
    this.users.push({
        id: nextId,
        telephone: createUserDto.telephone,
        name: createUserDto.name,
        deleted: false,
        rightsText: ''
    });
  }

  getUsers(searchText?: string): UserDto[] {
    return this.users.filter(x => !x.deleted && ((!searchText && x.name.includes(searchText)) || searchText))
  }

  getUserById(id: number): UserDto {
    var user = this.users.find(x => x.id === id);

    if (user === null){
      throw new NotFoundException(`User with id ${ id }`)
    }

    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    var user = this.users.find(x => x.id === id);

    if (user === null){
      throw new NotFoundException(`User with id ${ id }`)
    }

    function update(arr: UserDto[], id: number, updatedData: Partial<UserDto>): UserDto[] {
        return arr.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
      };

    var updatedData = {
        telephone: updateUserDto.telephone,
        name: updateUserDto.name
    }
    const result = update(this.users, id, updatedData)
  }

  deleteUser(id: number) {
    let index: number = this.users.findIndex(x => x.id === id);

    if (index < 0){
      throw new NotFoundException(`User with id ${ id }`)
    }

    this.users.splice(index, 1);
  }
}
