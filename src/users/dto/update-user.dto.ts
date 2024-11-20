import { ApiProperty } from "@nestjs/swagger";
import { isArray, IsArray, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ description: "Имя пользователя", nullable: false })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: "Список идентификаторов прав пользователя", nullable: true })
    @IsOptional()
    @IsArray()
    rightsIds?: number[];
  }