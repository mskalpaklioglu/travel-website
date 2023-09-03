// src/app/shared/flight.model.ts

export interface Flight {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate?: string;
  // Diğer özellikler
}
