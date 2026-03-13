import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Car } from '../../../../core/models/car.model';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent {
  @Input({ required: true }) car!: Car;
}
