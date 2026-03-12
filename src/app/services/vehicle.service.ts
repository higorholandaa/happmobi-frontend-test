import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle, VehicleFilter } from '../models/vehicle.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehicles';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getVehicles(filter?: VehicleFilter): Observable<Vehicle[]> {
    let url = this.apiUrl;
    const params = new URLSearchParams();
    
    if (filter) {
      if (filter.brand) params.append('brand', filter.brand);
      if (filter.category) params.append('category', filter.category);
      if (filter.year) params.append('year', filter.year.toString());
      if (filter.search) params.append('search', filter.search);
    }
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    return this.http.get<Vehicle[]>(url, { headers: this.getHeaders() });
  }

  getVehicle(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle, { headers: this.getHeaders() });
  }

  updateVehicle(id: string, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, vehicle, { headers: this.getHeaders() });
  }

  deleteVehicle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  reserveVehicle(id: string): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/${id}/reserve`, {}, { headers: this.getHeaders() });
  }

  releaseVehicle(id: string): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/${id}/release`, {}, { headers: this.getHeaders() });
  }
}
