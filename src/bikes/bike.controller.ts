import { Controller } from '@nestjs/common';
import { BikeService } from './bike.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Bike, BikeList } from './model/bike.model';
import {
  CreateBikeDto,
  GetBikeDto,
  GetBikesDto,
  UpdateBikeDto,
} from './dto/bike.dto';
@Controller('bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @GrpcMethod('BikeService', 'CreateBike')
  async createCreateBike(dto: CreateBikeDto): Promise<Bike> {
    return this.bikeService.createBike(dto);
  }
  @GrpcMethod('BikeService', 'GetBike')
  async getBike(dto: GetBikeDto): Promise<Bike> {
    return this.bikeService.getBike(dto);
  }
  @GrpcMethod('BikeService', 'GetBikes')
  async getBikes(dto: GetBikesDto): Promise<BikeList> {
    return this.bikeService.getBikes(dto);
  }
  @GrpcMethod('BikeService', 'UpdateBike')
  async updateBike(dto: UpdateBikeDto): Promise<Bike> {
    return this.bikeService.updateBike(dto);
  }
}
