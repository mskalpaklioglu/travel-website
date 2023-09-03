// flight-list.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];
  loading: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private flightService: FlightService) {}

  ngOnInit() {
    this.loading = true;
    this.flightService.getFlights().subscribe((results: Flight[]) => {
      this.flights = results;
      this.loading = false;
    });
  }

  // Sıralama işlevlerini burada ekleyin
  sortFlightsByDepartureTime() {
    this.flights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  }

  // Diğer sıralama işlevlerini de ekleyin
}
