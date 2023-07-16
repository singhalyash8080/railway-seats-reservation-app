import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Represents the booking form component.
 * This component displays the form for booking seats.
 */
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent {
  @Output() numberOfSeatsToBeBooked: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * updates the number of seats to be booked upon clicking on book
   * @param result - The submitted form values as object
   * @returns void
   */
  onClickSubmit(result) {
    if (result.numberOfSeats)
      this.numberOfSeatsToBeBooked.emit(result.numberOfSeats);
    else alert('The number of seats is a required input!');
  }
}
