import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../shared/flight.model';

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css']
})
export class FlightResultsComponent {
  @Input() flights: Flight[] = []; // flights girişini tanımlayın
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
}
