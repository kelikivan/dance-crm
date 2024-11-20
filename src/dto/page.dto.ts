import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt } from "class-validator";

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @IsInt()
  @ApiProperty({ description: "Общее кол-во элементов"})
  readonly totalCount: number;

  @IsInt()
  @ApiProperty({ description: "Отфильтрованое кол-во элементов"})
  readonly filteredCount: number;

  constructor(data: T[], totalCount: number) {
    this.data = data;
    this.totalCount = totalCount;
    this.filteredCount = data.length;
  }
}