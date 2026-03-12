import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { AuthService } from '../../services/auth.service';
import { Vehicle, VehicleFilter } from '../../models/vehicle.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  filterForm: FormGroup;
  loading = false;
  errorMessage = '';
  
  brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen', 'Fiat', 'Hyundai', 'Nissan'];
  categories = ['Sedã', 'SUV', 'Hatchback', 'Pickup', 'Esportivo'];
  years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private authService: AuthService,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      brand: [''],
      category: [''],
      year: [''],
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
    
    // Apply filter when form changes
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  loadVehicles(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.filteredVehicles = vehicles;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Erro ao carregar veículos';
        console.error('Error loading vehicles:', error);
      }
    });
  }

  applyFilter(): void {
    const filter = this.filterForm.value;
    
    this.filteredVehicles = this.vehicles.filter(vehicle => {
      let matches = true;
      
      if (filter.brand && vehicle.brand !== filter.brand) {
        matches = false;
      }
      
      if (filter.category && vehicle.category !== filter.category) {
        matches = false;
      }
      
      if (filter.year && vehicle.year !== filter.year) {
        matches = false;
      }
      
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        const matchesSearch = 
          vehicle.name?.toLowerCase().includes(searchLower) ||
          vehicle.brand?.toLowerCase().includes(searchLower) ||
          vehicle.model?.toLowerCase().includes(searchLower) ||
          vehicle.plate?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) {
          matches = false;
        }
      }
      
      return matches;
    });
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filteredVehicles = this.vehicles;
  }

  reserveVehicle(vehicle: Vehicle): void {
    if (vehicle.id && !vehicle.isReserved) {
      this.vehicleService.reserveVehicle(vehicle.id).subscribe({
        next: () => {
          this.loadVehicles();
        },
        error: (error) => {
          alert(error.error?.message || 'Erro ao reservar veículo');
        }
      });
    }
  }

  releaseVehicle(vehicle: Vehicle): void {
    if (vehicle.id && vehicle.isReserved) {
      this.vehicleService.releaseVehicle(vehicle.id).subscribe({
        next: () => {
          this.loadVehicles();
        },
        error: (error) => {
          alert(error.error?.message || 'Erro ao liberar veículo');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
