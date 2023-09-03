export interface Flight {
  departureDate: string;
  arrivalDate: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  price: number;
  departureAirport: string; // Eksik alanlar
  arrivalAirport: string;
}
