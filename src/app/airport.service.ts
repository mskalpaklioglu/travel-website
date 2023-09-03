import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airport } from './airport.model'; // Airport modelini içe aktarın

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private airportsUrl = 'assets/airport.json'; // JSON dosyasının yolu

  constructor(private http: HttpClient) {}

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.airportsUrl);
  }
}
