import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BookingFormComponent } from '../components/booking-form/booking-form.component';
import { SeatStatusComponent } from '../components/seat-status/seat-status.component';
import { BookingStatusComponent } from '../components/booking-status/booking-status.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

import { AppComponent } from '../components/app/app.component';

/**
 * The app module encapsulates all functionalities related to seats reservation in the train coach.
 * It provides components for booking seats and displaying resrvation details.
 */
@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // this module helps in form creation
  ],
  entryComponents: [BookingStatusComponent, SeatStatusComponent],
  declarations: [
    NavbarComponent, //displays the navbar on top
    AppComponent, // renders all other components dynamically inside it(intial component)
    BookingFormComponent, // displays the form for entering user input (no. of seats)
    BookingStatusComponent, // displays the status of the booking after submitting input in the booking form
    SeatStatusComponent, // displays the seats status in the train coach
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
