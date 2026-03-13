import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { CarsService } from './cars.service';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cars', async () => {
    const cars = await firstValueFrom(service.getCars());
    expect(cars.length).toBeGreaterThan(0);
  });

  it('should return all cars when search term is empty', async () => {
    const all = await firstValueFrom(service.getCars());
    const result = await firstValueFrom(service.searchCars(''));
    expect(result.length).toBe(all.length);
  });

  it('should filter cars by search term (case-insensitive)', async () => {
    const cars = await firstValueFrom(service.searchCars('mini'));
    expect(cars.length).toBeGreaterThan(0);
    cars.forEach((c) => expect(c.name.toLowerCase()).toContain('mini'));
  });

  it('should return empty array for unmatched search term', async () => {
    const cars = await firstValueFrom(service.searchCars('zzznomatch'));
    expect(cars.length).toBe(0);
  });

  it('should filter by car type', async () => {
    const cars = await firstValueFrom(service.filterCars({ types: ['Hatch compacto'] }));
    cars.forEach((c) => expect(c.type).toBe('Hatch compacto'));
  });

  it('should filter by engine', async () => {
    const cars = await firstValueFrom(service.filterCars({ engines: ['2.0'] }));
    cars.forEach((c) => expect(c.engine).toBe('2.0'));
  });

  it('should filter by seats', async () => {
    const cars = await firstValueFrom(service.filterCars({ seats: [7] }));
    cars.forEach((c) => expect(c.seats).toBe(7));
  });

  it('should return all cars when filters are empty', async () => {
    const all = await firstValueFrom(service.getCars());
    const cars = await firstValueFrom(service.filterCars({}));
    expect(cars.length).toBe(all.length);
  });
});



