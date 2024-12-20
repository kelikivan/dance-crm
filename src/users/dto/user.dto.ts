import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ description: "Идентификатор пользователя", nullable: false })
    id: number;

    @ApiProperty({ description: "Номер телефона пользователя", nullable: false })
    phone: string;

    @ApiProperty({ description: "Имя пользователя", nullable: true })
    name?: string;

    @ApiProperty({ description: "Удален ли пользователь", nullable: false })
    deleted: boolean;

    @ApiProperty({ description: "Список ролей пользователя", nullable: true })
    roles?: string;
  }