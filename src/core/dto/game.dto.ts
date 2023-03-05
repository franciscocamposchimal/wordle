import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, NotContains } from 'class-validator';

class UserStatisticsDto {
  @ApiProperty({
    description: 'Words hits count',
  })
  @IsNumber()
  @IsNotEmpty()
  public totalWordsCount: number;

  @ApiProperty({
    description: 'Words miss count',
  })
  @IsNumber()
  @IsNotEmpty()
  public hitWordsCount: number;
}

export class GameDto {
  @ApiProperty({
    description: 'Primary key',
  })
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @ApiProperty({
    description: 'Word to guess',
    example: 'hello',
  })
  @IsNotEmpty()
  @IsString()
  public word: string;

  @ApiProperty({
    description: 'Game status',
  })
  @IsBoolean()
  @IsNotEmpty()
  public isWon: boolean;

  @ApiProperty({
    description: 'Attempts',
  })
  @IsArray()
  public attempts: object[];

  @ApiProperty({
    description: 'Attempt count',
  })
  @IsNumber()
  @IsNotEmpty()
  public attemptCount: number;

  @ApiProperty({
    description: 'Due time',
    example: '05/03/2023 02:46:57',
  })
  @IsNotEmpty()
  @IsString()
  public dueTime: string;

  @ApiProperty({
    description: 'User statistics',
  })
  @Type(() => UserStatisticsDto)
  statistics: UserStatisticsDto;
}

export class UserAttemptDto {
  @ApiProperty({
    description: 'Word to guess',
    example: 'Hello',
  })
  @IsNotEmpty()
  @IsString()
  @NotContains(' ')
  @Transform(({ value }) => value?.trim())
  @MaxLength(5)
  @MinLength(5)
  public userWord: string;
}
