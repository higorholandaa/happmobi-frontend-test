import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarCardComponent } from './car-card.component';
import { Car } from '../../../../core/models/car.model';

const mockCar: Car = {
  id: 1,
  name: 'Mini Cooper',
  year: 2021,
  type: 'Hatch compacto',
  engine: '1.8',
  seats: 5,
  image: 'https://example.com/car.jpg',
};

describe('CarCardComponent', () => {
  let component: CarCardComponent;
  let fixture: ComponentFixture<CarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarCardComponent);
    component = fixture.componentInstance;
    component.car = mockCar;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display car name and year', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.textContent).toContain('Mini Cooper');
    expect(compiled.textContent).toContain('2021');
  });

  it('should display car type', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.textContent).toContain('Hatch compacto');
  });

  it('should display engine info', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.textContent).toContain('1.8');
  });

  it('should display seats info', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.textContent).toContain('5');
  });

  it('should render car image with correct src', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain(mockCar.image);
  });
});
