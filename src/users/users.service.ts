import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../orm/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { GetUsersDto } from './dto/get-users.dto';
import { PageDto } from 'src/dto/page.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  
  async createUser(newUser: CreateUserDto): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: {
        phone: newUser.phone
      },
    });

    if (user){
      throw new BadRequestException(`User with phone ${ newUser.phone } already exists.`)
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newUser.password, salt);

    const userEntity = this.usersRepository.create({
        phone: newUser.phone,
        password: hashPassword,
        deleted: false,
    });
    this.usersRepository.save(userEntity)
  }

  async getUsers(filter: GetUsersDto): Promise<PageDto<UserDto>> {    
    var query = this.usersRepository.find();

    if (!filter.search){
      query = this.usersRepository
        .find({
          where: {
            phone: Like(`%${filter.search}%`)
          }
        });
    }

    const users = await query.then(items => items.map(e => this.toUserDto(e)));

    const totalCount = await this.usersRepository.count();
    
    return new PageDto<UserDto>(users, totalCount);
  } 

  async getUserById(id: number): Promise<UserDto> {
    const userEntity = await this.usersRepository.findOneBy({ id });

    if (userEntity === null){
      throw new NotFoundException(`User with id ${ id } not found.`)
    }

    return this.toUserDto(userEntity);
  }

  async getUserByPhone(phone: string): Promise<[UserDto, string]> {
    const userEntity = await this.usersRepository.findOne({
      where: {
        phone: phone
      }
    });

    if (userEntity === null){
      throw new NotFoundException(`User with phone ${ phone } not found.`)
    }

    return [this.toUserDto(userEntity), userEntity.password];
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const userEntity = await this.usersRepository.findOneBy({ id });

    if (userEntity === null){
      throw new NotFoundException(`User with id ${ id } not found.`)
    }

    userEntity.name = updateUserDto.name;
    await this.usersRepository.update(id, userEntity);
  }

  async deleteUser(id: number): Promise<void> {
    const userEntity = await this.usersRepository.findOneBy({ id });

    if (userEntity === null){
      throw new NotFoundException(`User with id ${ id } not found.`)
    }

    await this.usersRepository.delete(id);
  }

  private toUserDto(entity: User){
    const dto = new UserDto();
    dto.id = entity.id;
    dto.phone = entity.phone;
    dto.name = entity.name;
    dto.deleted = entity.deleted;
    return dto;
  }
}
