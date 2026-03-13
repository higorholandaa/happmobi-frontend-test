import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarFilters } from '../../../../core/models/car.model';
import { APP_ICONS } from '../../../../core/icons/icons.constants';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  private router = inject(Router);

  readonly icons = APP_ICONS;

  openSections = { types: true, engines: true, seats: true };

  toggleSection(section: keyof typeof this.openSections): void {
    this.openSections[section] = !this.openSections[section];
  }
  carTypes = [
    'Hatch compacto', 'Hatch médio', 'SUV compacto', 'SUV médio',
    'SUV grande', 'Crossover', 'Coupé', 'Picape leve',
    'Picape leve-média', 'Picape média', 'Sedan Compacto',
    'Sedan médio', 'Sedan grande', 'Minivan',
    'Utilitário leve', 'Utilitário',
  ];

  engineOptions = ['1.0', '1.4', '1.6', '1.8', '2.0'];
  seatsOptions = [2, 3, 4, 5, 6, 7];

  selectedTypes: string[] = [];
  selectedEngines: string[] = [];
  selectedSeats: number[] = [];

  toggleType(type: string): void {
    this.selectedTypes = this.toggle(this.selectedTypes, type);
  }

  toggleEngine(engine: string): void {
    this.selectedEngines = this.toggle(this.selectedEngines, engine);
  }

  toggleSeat(seat: number): void {
    this.selectedSeats = this.toggle(this.selectedSeats, seat);
  }

  isTypeSelected(type: string): boolean {
    return this.selectedTypes.includes(type);
  }

  isEngineSelected(engine: string): boolean {
    return this.selectedEngines.includes(engine);
  }

  isSeatSelected(seat: number): boolean {
    return this.selectedSeats.includes(seat);
  }

  applyFilters(): void {
    const filters: Partial<CarFilters> = {
      types: this.selectedTypes,
      engines: this.selectedEngines,
      seats: this.selectedSeats,
    };
    this.router.navigate(['/home'], { state: { filters } });
  }

  clearFilters(): void {
    this.selectedTypes = [];
    this.selectedEngines = [];
    this.selectedSeats = [];
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }

  private toggle<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }
}
