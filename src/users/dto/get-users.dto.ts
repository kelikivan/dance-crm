import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class GetUsersDto {
    @ApiProperty({ description: "Поисковой запрос", nullable: false })
    @IsString()
    search: string;

    @ApiProperty({ description: "Кол-во данных, которое нужно пропустить", nullable: true })
    @IsInt()
    skip: number = 0;

    @ApiProperty({ description: "Кол-во данных на выходе", nullable: false })
    @IsInt()
    take: number = 10;
  }