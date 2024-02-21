export class BikeList {
  bikes: Bike[];
}

export interface Bike {
  id: number;
  name: string;
  description: string;
  image: string;
  biketype: string;
}
