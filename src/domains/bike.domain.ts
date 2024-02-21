import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import {
  CreateBikeDto,
  ICreateBikeDto,
  UpdateBikeDto,
} from 'src/bikes/dto/bike.dto';

export class BikeDomain implements IBikeDomain {
  constructor(private dto: CreateBikeDto | UpdateBikeDto) {}
  private isCreateBikeDto(arg: unknown): arg is CreateBikeDto {
    return (
      typeof arg === 'object' &&
      arg !== null &&
      typeof (arg as CreateBikeDto).image === 'string' &&
      typeof (arg as CreateBikeDto).description === 'string'
    );
  }
  getBikeCreateInput(): ICreateBikeDto {
    if (!this.isCreateBikeDto(this.dto)) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'this bike have not been persisted.',
      });
    }
    return CreateBikeDto.transform(this.dto);
  }
  getBikeUpdateInput(): Partial<ICreateBikeDto> {
    return UpdateBikeDto.transform(this.dto as UpdateBikeDto);
  }

  createBike(): BikeDomain {
    // validation
    if (!this.isCreateBikeDto(this.dto)) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'this bike have not been persisted.',
      });
    }

    return this;
  }

  updateBike(): BikeDomain {
    // validation
    return this;
  }

  static registerBikeDomain(dto: CreateBikeDto | UpdateBikeDto) {
    return new BikeDomain(dto);
  }
}

export interface IBikeDomain {
  getBikeCreateInput(): ICreateBikeDto;
  getBikeUpdateInput(): Partial<ICreateBikeDto>;
  createBike(): BikeDomain;
  updateBike(): BikeDomain;
}
