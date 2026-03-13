export interface Car {
  id: number;
  name: string;
  year: number;
  type: string;
  engine: string;
  seats: number;
  image: string;
}

export interface CarFilters {
  types: string[];
  engines: string[];
  seats: number[];
}
