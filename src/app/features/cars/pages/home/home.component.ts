import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Car, CarFilters } from '../../../../core/models/car.model';
import { User } from '../../../../core/models/user.model';
import { CarsService } from '../../services/cars.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { BottomNavComponent } from '../../../../shared/components/bottom-nav/bottom-nav.component';
import { APP_ICONS } from '../../../../core/icons/icons.constants';

// Tela principal: exibe os carros disponíveis, busca e filtros
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    CarCardComponent,
    BottomNavComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private carsService = inject(CarsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  usuario: User | null = null;
  carros: Car[] = [];
  termoBusca = '';
  readonly icones = APP_ICONS;

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser();
    this.carregarCarros();
  }

  // Carrega todos os carros ou aplica filtros vindos da tela de filtros
  carregarCarros(): void {
    const filtrosAtivos = history.state?.filters as Partial<CarFilters> | undefined;

    const busca = filtrosAtivos
      ? this.carsService.filterCars(filtrosAtivos)
      : this.carsService.getCars();

    busca.subscribe((lista) => (this.carros = lista));
  }

  // Filtra os carros conforme o texto digitado na busca
  buscarCarros(): void {
    this.carsService.searchCars(this.termoBusca).subscribe((lista) => (this.carros = lista));
  }

  // Navega para a tela de filtros
  abrirFiltros(): void {
    this.router.navigate(['/filters']);
  }
}
