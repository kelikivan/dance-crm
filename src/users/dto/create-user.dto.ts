import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: "Номер телефона пользователя", nullable: false })
    @IsPhoneNumber('RU')
    @Length(11)
    phone: string;

    @ApiProperty({ description: "Пароль пользователя", nullable: false })
    @MinLength(8)
    password: string;
  }