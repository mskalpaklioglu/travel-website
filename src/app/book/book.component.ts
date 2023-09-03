import { Airport } from './../airport.model';
import { Component, OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FlightService } from '../flight.service';
import { Flight } from '../shared/flight.model';
import { AirportService } from '../airport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  airports: Airport[] = [];
  bookForm: FormGroup;
  flights: Flight[] = [];
  showPopup = false;
  loading: boolean = false;
  showFlightsButtonActive: boolean = false;
  showResults: boolean = false;
  private subscription: Subscription = new Subscription(); // Subscription nesnesini oluşturun

  constructor(private router: Router,private fb: FormBuilder, private flightService: FlightService, private airportService: AirportService) {
    this.bookForm = this.fb.group({
      departureAirport: ['', Validators.required],
      arrivalAirport: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: [''],
      oneWay: [false],
      adults: [1],
  children: [0],
      tripType: ['roundtrip'] // tripType form kontrolünü ekleyin
    });



    this.bookForm.get('oneWay')!.valueChanges.subscribe((value) => {
      if (value) {
        this.bookForm.get('returnDate')?.reset();
        this.bookForm.get('returnDate')?.disable();
      } else {
        this.bookForm.get('returnDate')?.enable();
      }
    });
  }





  showFlights() {
    if (!this.showFlightsButtonActive) {
      this.showFlightsButtonActive = true;

      if (this.bookForm.valid) {
        this.loading = true;
        this.searchFlights();
        this.showResults = true;
        this.router.navigate(['/book']);
      } else {
        // Form geçerli değilse, kullanıcıya hata mesajları göstermek isteyebilirsiniz.
      }
    }
  }

  openPopup() {
    // Uçuşları getir
    this.flightService.getFlights().subscribe((flights) => {
      this.flights = flights;
      this.showPopup = true; // Popup'ı aç
    });
  }
  closePopup() {
    this.showPopup = false; // Popup'ı kapat
  }



  onSubmit() {
    if (this.bookForm.valid) {
      this.loading = true;
      this.searchFlights();
    } else {
      // Form geçerli değilse, kullanıcıya hata mesajları göstermek isteyebilirsiniz.
    }
  }

  sortFlightsByDepartureTime() {
    this.flights.sort((a, b) => a.departureDate.localeCompare(b.departureDate));
  }



  onOneWayChange() {
    const oneWayControl = this.bookForm.get('oneWay');
    if (oneWayControl) {
      if (oneWayControl.value) {
        this.bookForm.get('returnDate')?.reset();
        this.bookForm.get('returnDate')?.disable();
      } else {
        this.bookForm.get('returnDate')?.enable();
      }
    }
  }

  searchFlights() {
    // Aboneliği başlatın ve this.subscription'a ekleyin
    this.subscription.add(
      this.flightService.searchFlights(this.bookForm.value).subscribe(
        (results: Flight[]) => {
          this.flights = results;
          this.loading = false;
        },
        (error) => {
          console.error('Uçuş arama hatası:', error);
          this.loading = false;
        }
      )
    );
  }

  // ngOnDestroy yöntemini kullanarak component yok edildiğinde aboneliği iptal edin
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    // Sayfa yüklendiğinde havaalanlarını alın
    this.airportService.getAirports().subscribe(
      (airports: Airport[]) => {
        this.airports = airports;
      },
      (error) => {
        console.error('Havaalanı verilerini alma hatası:', error);
      }
    );
    }


}
