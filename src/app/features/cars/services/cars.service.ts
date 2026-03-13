import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car, CarFilters } from '../../../core/models/car.model';
import { APP_ASSETS } from '@core/constants/assets.constants';

const MOCK_CARS: Car[] = [
  {
    id: 1,
    name: 'Mini Cooper',
    year: 2021,
    type: 'Hatch compacto',
    engine: '1.8',
    seats: 5,
    image: APP_ASSETS.cars.miniCooper,
  },
  {
    id: 2,
    name: 'Ford Ká',
    year: 2017,
    type: 'Hatch médio',
    engine: '1.0',
    seats: 5,
    image: APP_ASSETS.cars.fordKa,
  },
  {
    id: 3,
    name: 'Duster',
    year: 2020,
    type: 'SUV compacto',
    engine: '1.6',
    seats: 5,
    image: APP_ASSETS.cars.duster,
  },
  {
    id: 4,
    name: 'Jeep Compass',
    year: 2021,
    type: 'SUV médio',
    engine: '1.8',
    seats: 7,
    image: APP_ASSETS.cars.jeepCompass,
  },
  {
    id: 5,
    name: 'Toro',
    year: 2016,
    type: 'Picape média',
    engine: '1.6',
    seats: 5,
    image: APP_ASSETS.cars.toro,
  },
  {
    id: 6,
    name: 'T-Cross',
    year: 2020,
    type: 'Crossover',
    engine: '1.6',
    seats: 5,
    image: APP_ASSETS.cars.tCross,
  },
  {
    id: 7,
    name: 'Strada',
    year: 2016,
    type: 'Picape leve',
    engine: '1.4',
    seats: 2,
    image: APP_ASSETS.cars.strada,
  },
  {
    id: 8,
    name: 'Saveiro',
    year: 2018,
    type: 'Picape leve-média',
    engine: '1.6',
    seats: 5,
    image: APP_ASSETS.cars.saveiro,
  },
  {
    id: 9,
    name: 'Versa',
    year: 2019,
    type: 'Sedan médio',
    engine: '1.4',
    seats: 5,
    image: APP_ASSETS.cars.versa,
  },
  {
    id: 10,
    name: 'Jetta',
    year: 2021,
    type: 'Sedan grande',
    engine: '2.0',
    seats: 5,
    image: APP_ASSETS.cars.jetta,
  },
  {
    id: 11,
    name: 'Doblo',
    year: 2018,
    type: 'Minivan',
    engine: '1.8',
    seats: 7,
    image: APP_ASSETS.cars.doblo,
  },
  {
    id: 12,
    name: 'Fiorino',
    year: 2017,
    type: 'Utilitário leve',
    engine: '1.6',
    seats: 2,
    image: APP_ASSETS.cars.fiorino,
  },
  {
    id: 13,
    name: 'Partner',
    year: 2016,
    type: 'Utilitário',
    engine: '1.6',
    seats: 2,
    image: APP_ASSETS.cars.partner,
  },
];

@Injectable({ providedIn: 'root' })
export class CarsService {
  getCars(): Observable<Car[]> {
    return of(MOCK_CARS);
  }

  searchCars(term: string): Observable<Car[]> {
    const lower = term.toLowerCase().trim();
    return of(!lower ? MOCK_CARS : MOCK_CARS.filter((c) => c.name.toLowerCase().includes(lower)));
  }

  filterCars(filters: Partial<CarFilters>): Observable<Car[]> {
    return of(
      MOCK_CARS.filter((car) => {
        const typeMatch = !filters.types?.length || filters.types.includes(car.type);
        const engineMatch = !filters.engines?.length || filters.engines.includes(car.engine);
        const seatsMatch = !filters.seats?.length || filters.seats.includes(car.seats);
        return typeMatch && engineMatch && seatsMatch;
      })
    );
  }
}
