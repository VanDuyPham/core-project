import { Injectable } from '@nestjs/common';
import { Bike, BikeList } from './model/bike.model';
import {
  CreateBikeDto,
  GetBikeDto,
  GetBikesDto,
  UpdateBikeDto,
} from './dto/bike.dto';
import { BikeRepository } from 'src/repositories/bike.repository';
import { BikeDomain } from 'src/domains/bike.domain';
@Injectable()
export class BikeService {
  // private bikes: Bike[] = [
  //   {
  //     id: 1,
  //     name: 'Kitty',
  //     description: 'Kitty is a cat.',
  //     image: 'Upload/Image/Kitty.jpg',
  //     biketype: 'Mountain',
  //   },
  //   {
  //     id: 2,
  //     name: 'Daniel',
  //     description: 'Daniel is a dog.',
  //     image: 'Upload/Image/Daniel.jpg',
  //     biketype: 'Touring',
  //   },
  // ]

  constructor(private readonly bikeRepository: BikeRepository) {}
  async getBikes(dto: GetBikesDto): Promise<BikeList> {
    const result = await this.bikeRepository.getBikes(dto.name);
    return { bikes: result };
  }

  async getBike(dto: GetBikeDto): Promise<Bike> {
    const result = await this.bikeRepository.getBike(dto.id);
    return result;
  }

  async createBike(dto: CreateBikeDto): Promise<Bike> {
    const bikeDomain = BikeDomain.registerBikeDomain(dto);
    bikeDomain.createBike();
    const result = await this.bikeRepository.createBike(bikeDomain);
    return result;
  }

  async updateBike(dto: UpdateBikeDto): Promise<Bike> {
    const bikeDomain = BikeDomain.registerBikeDomain(dto);
    bikeDomain.updateBike();
    const result = await this.bikeRepository.updateBike(bikeDomain, dto.id);
    return result;
  }
}
