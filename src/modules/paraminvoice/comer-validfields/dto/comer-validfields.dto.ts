import { ApiProperty } from '@nestjs/swagger';
import { Message } from 'src/shared/utils/message.decorator';
import { IsOptional, IsString, Length, IsNumber, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class ComerValidfieldsDto {
  @Type(() => String)
  @IsString({ message: Message.STRING('$property') })
  @Length(1, 30, {
    message: Message.LENGTH('$property', '$constraint1 $constraint2'),
  })
  @IsOptional()
  @ApiProperty({
    title: 'id_columna',
    example: 'Dato de tipo texto',
    required: false,
  })
  id: string;

  @Type(() => String)
  @IsString({ message: Message.STRING('$property') })
  @Length(1, 15, {
    message: Message.LENGTH('$property', '$constraint1 $constraint2'),
  })
  @IsOptional()
  @ApiProperty({
    title: 'tipo',
    example: 'Dato de tipo texto',
    required: false,
  })
  type: string;

  @Type(() => Number)
  @IsNumber({}, { message: Message.NUMBER('$property') })
  @Max(9999999999, {
    message: 'El maximo valor de longitud debe ser 9999999999',
  })
  @IsOptional()
  @ApiProperty({
    title: 'longitud',
    example: 'Dato de tipo numérico',
    required: false,
  })
  length: number;

  @Type(() => String)
  @IsString({ message: Message.STRING('$property') })
  @Length(1, 60, {
    message: Message.LENGTH('$property', '$constraint1 $constraint2'),
  })
  @IsOptional()
  @ApiProperty({
    title: 'descripcion',
    example: 'Dato de tipo texto',
    required: false,
  })
  description: string;
}

export class ComerValidfieldsInDto {
  @Type(() => String)
  @IsString({ message: Message.STRING('$property') })
  @Length(1, 30, {
    message: Message.LENGTH('$property', '$constraint1 $constraint2'),
  })
  @IsOptional()
  @ApiProperty({
    title: 'id_columna',
    example: 'Dato de tipo texto',
    required: false,
  })
  id: string;
}
