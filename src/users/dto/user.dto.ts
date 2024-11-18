import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ description: "Идентификатор пользователя", nullable: false })
    id: number;

    @ApiProperty({ description: "Номер телефона пользователя", nullable: false })
    telephone: string;

    @ApiProperty({ description: "Имя пользователя", nullable: false })
    name: string;

    @ApiProperty({ description: "Удален ли пользователь", nullable: false })
    deleted: boolean;

    @ApiProperty({ description: "Список кодов прав пользователя", nullable: false })
    rightsText: string;
  }