import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockVehicles: Vehicle[] = [
    {
      id: '1',
      name: 'Mini Cooper',
      brand: 'Mini',
      model: 'Cooper',
      year: 2021,
      plate: 'ABC-1234',
      color: 'Verde',
      category: 'Hatchback',
      imageUrl: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=400',
      isReserved: false
    },
    {
      id: '2',
      name: 'Jeep Compass',
      brand: 'Jeep',
      model: 'Compass',
      year: 2021,
      plate: 'DEF-5678',
      color: 'Preto',
      category: 'SUV',
      imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      isReserved: true
    },
    {
      id: '3',
      name: 'Ford Ka',
      brand: 'Ford',
      model: 'Ka',
      year: 2017,
      plate: 'GHI-9012',
      color: 'Prata',
      category: 'Hatchback',
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      isReserved: false
    },
    {
      id: '4',
      name: 'Toyota Corolla',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2023,
      plate: 'JKL-3456',
      color: 'Branco',
      category: 'Sedã',
      imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      isReserved: false
    },
    {
      id: '5',
      name: 'Duster',
      brand: 'Renault',
      model: 'Duster',
      year: 2020,
      plate: 'MNO-7890',
      color: 'Vermelho',
      category: 'SUV',
      imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      isReserved: false
    },
    {
      id: '6',
      name: 'Versa',
      brand: 'Nissan',
      model: 'Versa',
      year: 2019,
      plate: 'PQR-1122',
      color: 'Cinza',
      category: 'Sedã',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
      isReserved: false
    },
    {
      id: '7',
      name: 'HB20',
      brand: 'Hyundai',
      model: 'HB20',
      year: 2022,
      plate: 'STU-3344',
      color: 'Azul',
      category: 'Hatchback',
      imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
      isReserved: false
    },
    {
      id: '8',
      name: 'Hilux',
      brand: 'Toyota',
      model: 'Hilux',
      year: 2024,
      plate: 'VWX-5566',
      color: 'Branco',
      category: 'Pickup',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
      isReserved: false
    }
  ];

  getMockVehicles(): Observable<Vehicle[]> {
    return of(this.mockVehicles).pipe(delay(500));
  }

  reserveVehicle(id: string): Observable<Vehicle> {
    const vehicle = this.mockVehicles.find(v => v.id === id);
    if (vehicle) {
      if (vehicle.isReserved) {
        return throwError(() => ({ error: { message: 'Veículo já está reservado' } }));
      }
      vehicle.isReserved = true;
      return of(vehicle).pipe(delay(300));
    }
    return throwError(() => ({ error: { message: 'Veículo não encontrado' } }));
  }

  releaseVehicle(id: string): Observable<Vehicle> {
    const vehicle = this.mockVehicles.find(v => v.id === id);
    if (vehicle) {
      vehicle.isReserved = false;
      return of(vehicle).pipe(delay(300));
    }
    return throwError(() => ({ error: { message: 'Veículo não encontrado' } }));
  }
}
