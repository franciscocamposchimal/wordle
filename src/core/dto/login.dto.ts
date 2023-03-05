import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'jhon.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123',
  })
  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class UserConnectedDto {
  @ApiProperty({
    description: 'Primary key',
  })
  public id: number;

  @ApiProperty({
    description: 'Email del usuario',
    example: 'jhon.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}

export class UserLoggedDto {
  @ApiProperty({
    description: 'Objecto del usuario conectado',
  })
  @Type(() => UserConnectedDto)
  user: UserConnectedDto;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123',
  })
  @IsNotEmpty()
  @IsString()
  public access_token: string;
}

export class PayloadDto {
  @ApiProperty({
    description: 'Primary key',
  })
  @IsNotEmpty()
  @IsNumber()
  public sub: number;

  @ApiProperty({
    description: 'Email del usuario',
    example: 'jhon.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  public user: string;
}
