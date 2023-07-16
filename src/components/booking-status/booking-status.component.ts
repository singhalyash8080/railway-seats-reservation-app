import { Component, Input } from '@angular/core';

/**
 * Represents the booking status component.
 * This component displays the booking status of the seats after clicking on book.
 */
@Component({
  selector: 'app-booking-status',
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.css'],
})
export class BookingStatusComponent {
  @Input() bookingDone: boolean; // indicates if a booking was successful or not
  @Input() seatsBooked: number[][]; // indicates the seatsBooked if the reservation is successful
  @Input() bookingStatusMessage: string; // indicates the message to be shown upon booking

  /**
   * updates the number of seats to be booked upon clicking on book
   * @param rowIndex - indicates the row number in the coach
   * @param columnIndex - indicates the column number in the coach
   * @returns the seat number in the required format as 1A,3B etc.
   */
  getSeatNumber(rowIndex: number, columnIndex: number): string {
    if (rowIndex === 11) {
      if (columnIndex === 0) return String.fromCharCode(65 + columnIndex);
      else if (columnIndex === 1) return String.fromCharCode(67 + columnIndex);
      else return String.fromCharCode(69 + columnIndex);
    } else {
      return String.fromCharCode(65 + columnIndex);
    }
  }
}
