import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: "Номер телефона пользователя", nullable: false })
    @IsPhoneNumber('RU')
    telephone: string;

    @ApiProperty({ description: "Имя пользователя", nullable: false })
    @IsNotEmpty()
    name: string;
  }