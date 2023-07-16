import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { SeatStatusComponent } from '../seat-status/seat-status.component';
import { BookingStatusComponent } from '../booking-status/booking-status.component';

@Component({
  selector: 'railway-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/**
 * Represents the App Component.
 * This component displays all other components dynamically.
 */
export class AppComponent {
  seatStatus: boolean[][] = []; // for storing the global seats status inside the app
  numberOfSeatsAvailable: number = 80; // number of seats available in the beginning(when the app starts)
  numberOfSeatsToBeBooked = 0; // for storing the number of seats to be booked as given in user input

  // constant variables for storing info about total seats and number of seats in each row of the train coach
  totalSeats = 80;
  seatsInRow = 7;
  lastRowSeats = 3;
  rows = Math.floor(this.totalSeats / this.seatsInRow);

  // for dynamic component rendering
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef;

  // constructor for initializing the initial availability of seats in the coach
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    for (let i = 0; i < this.rows; i++) {
      const rowSeats = Array(this.seatsInRow).fill(false);
      this.seatStatus.push(rowSeats);
    }
    this.seatStatus.push(Array(this.lastRowSeats).fill(false));
  }

  /**
   * book seats for the user in the coach
   * @param numberOfSeatsToBeBooked - The number of seats to be booked as given in input by the user in booking-form component
   * @returns void
   */
  bookSeats(numberOfSeatsToBeBooked: number): void {
    // empties the container for dynamic rendering of booking-status and seat-status component
    this.dynamicComponentContainer.clear();

    // renders the booking-status component
    const componentFactoryForBookingStatus =
      this.componentFactoryResolver.resolveComponentFactory(
        BookingStatusComponent
      );

    const componentRefForBookingStatus =
      this.dynamicComponentContainer.createComponent(
        componentFactoryForBookingStatus
      );

    // renders the seat-status component
    const componentFactoryForSeatStatus =
      this.componentFactoryResolver.resolveComponentFactory(
        SeatStatusComponent
      );

    const componentRefForSeatStatus =
      this.dynamicComponentContainer.createComponent(
        componentFactoryForSeatStatus
      );
    componentRefForSeatStatus.instance.seatStatus = this.seatStatus;

    const reservedSeats = componentRefForSeatStatus.instance.reserveSeats(
      numberOfSeatsToBeBooked,
      this.numberOfSeatsAvailable
    );

    // display the seat numbers along with the seat status if the reservation is successful else display the error
    if (reservedSeats !== null) {
      this.numberOfSeatsAvailable -= numberOfSeatsToBeBooked;
      componentRefForBookingStatus.instance.bookingDone = true;
      componentRefForBookingStatus.instance.seatsBooked = reservedSeats;
      componentRefForBookingStatus.instance.bookingStatusMessage =
        'Successfully reserved seats with seat numbers - ';
    } else {
      componentRefForBookingStatus.instance.bookingDone = false;
      componentRefForBookingStatus.instance.bookingStatusMessage = `Sorry, no reservation available for ${numberOfSeatsToBeBooked} seats! (Note - Upto 7 seats can be reserved at a time)`;
    }
  }
}
