import { ApiProperty } from "@nestjs/swagger";

export class RightDto {
    @ApiProperty({ description: "Идентификатор права", nullable: false })
    id: number;

    @ApiProperty({ description: "Код права", nullable: false })
    code: string;

    @ApiProperty({ description: "Описание права", nullable: true })
    description: string;
  }