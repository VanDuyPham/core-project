import { Injectable } from '@nestjs/common';
import { Bike } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { PrismaBike } from '../../prisma/custom.prisma.type';
import { IBikeDomain } from '../domains/bike.domain';
import { PrismaService } from 'infrastructures/dao/prisma.service';

@Injectable()
export class BikeRepository implements IBikeRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createBike(bikeDomain: IBikeDomain): Promise<Bike> {
    const result = await (this.prisma['Bike'] as PrismaBike).create({
      data: bikeDomain.getBikeCreateInput(),
    });
    return result;
  }
  async updateBike(bikeDomain: IBikeDomain, id: number): Promise<Bike> {
    const result = await (this.prisma['Bike'] as PrismaBike).update({
      where: {
        id,
      },
      data: bikeDomain.getBikeUpdateInput(),
    });
    return result;
  }
  async getBike(id: number): Promise<Bike> {
    const result = await (this.prisma['Bike'] as PrismaBike).findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `bike is not found. bikeId: ${id}`,
      });
    }
    return result;
  }
  async getBikes(name: string): Promise<Bike[]> {
    const result = await (this.prisma['Bike'] as PrismaBike).findMany();
    return result;
  }
}

export interface IBikeRepository {
  createBike(bikeDomain: IBikeDomain): Promise<Bike>;
  getBike(id: number): Promise<Bike>;
  getBikes(name: string): Promise<Bike[]>;
}
