import { ApiProperty } from "@nestjs/swagger";
import { isArray, IsArray, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ description: "Номер телефона пользователя", nullable: false })
    @IsPhoneNumber('RU')
    telephone: string;

    @ApiProperty({ description: "Имя пользователя", nullable: false })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: "Список идентификаторов прав пользователя", nullable: true })
    @IsArray()
    rightsIds: number[];
  }