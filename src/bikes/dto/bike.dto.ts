import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBikeDto {
  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  name: string;

  @IsString()
  biketype: string;

  static transform(arg: CreateBikeDto): ICreateBikeDto {
    return {
      name: arg.name,
      biketype: arg.biketype,
    };
  }
}

export class UpdateBikeDto extends PartialType(CreateBikeDto) {
  @IsNumber()
  id: number;
  static transform(arg: UpdateBikeDto): Partial<ICreateBikeDto> {
    return {
      name: arg.name,
      biketype: arg.biketype,
    };
  }
}

export class GetBikeDto {
  @IsNumber()
  id: number;
}

export class GetBikesDto {
  @IsString()
  name: string;
}

export interface ICreateBikeDto {
  name: string;
  biketype: string;
}
