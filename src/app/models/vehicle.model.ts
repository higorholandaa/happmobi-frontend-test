export interface Vehicle {
  id?: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  category: string;
  imageUrl?: string;
  isReserved?: boolean;
  reservedBy?: string;
}

export interface VehicleFilter {
  brand?: string;
  category?: string;
  year?: number;
  search?: string;
}
