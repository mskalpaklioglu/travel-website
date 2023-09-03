// flight.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from './flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flightsUrl = 'assets/flights.json'; // JSON dosyasının yolu

  constructor(private http: HttpClient) {}

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl);
  }

  // Uçuşları aramak için bir metod
  searchFlights(searchParams: any): Observable<Flight[]> {
    // Örnek bir URL yapısı: `/api/flights?departureDate=2023-09-15&arrivalDate=2023-09-16&maxPrice=300`

    // Uçuşları filtrelemek için bu URL'i kullanabilirsiniz.
    return this.http.get<Flight[]>(`${this.flightsUrl}?departureDate=${searchParams.departureDate}&arrivalDate=${searchParams.arrivalDate}&maxPrice=${searchParams.maxPrice}`);
  }
}
