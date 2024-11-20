import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = []

  async createUser(newUser: CreateUserDto) {

    const user = this.users.find(x => x.phone === newUser.phone);
    if (user){
      throw new BadRequestException(`User with phone ${ newUser.phone } already exists.`)
    }

    const maxId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);   
    const nextId = maxId + 1;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newUser.password, salt);

    this.users.push({
        id: nextId,
        phone: newUser.phone,
        password: hashPassword,
        deleted: false,
    });
  }

  getUsers(searchText?: string): UserDto[] {
    return this.users.filter(x => !x.deleted && ((!searchText && x.name.includes(searchText)) || searchText))
  }

  getUserById(id: number): UserDto {
    const user = this.users.find(x => x.id === id);

    if (user === null){
      throw new NotFoundException(`User with id ${ id } not found.`)
    }

    return user;
  }

  async getUserByPhone(phone: string): Promise<UserDto>{
    const user = this.users.find(x => x.phone === phone);

    if (user === null){
      throw new NotFoundException(`User with phone ${ phone } not found.`)
    }

    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find(x => x.id === id);

    if (user === null){
      throw new NotFoundException(`User with id ${ id } not found.`)
    }

    function update(arr: UserDto[], id: number, updatedData: Partial<UserDto>): UserDto[] {
        return arr.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
      };

    const updatedData = {
        name: updateUserDto.name
    }
    const result = update(this.users, id, updatedData)
  }

  deleteUser(id: number) {
    let index: number = this.users.findIndex(x => x.id === id);

    if (index < 0){
      throw new NotFoundException(`User with id ${ id } not found.`)
    }

    this.users.splice(index, 1);
  }
}
