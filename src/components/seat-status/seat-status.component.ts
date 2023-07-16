import { Component, Input } from '@angular/core';

/**
 * Represents the seats status component.
 * This component displays the current seats status in the coach
 */
@Component({
  selector: 'seat-Status',
  templateUrl: `./seat-status.component.html`,
  styleUrls: ['./seat-status.component.css'],
})
export class SeatStatusComponent {
  @Input() seatStatus: boolean[][];

  totalSeats = 80;
  seatsInRow = 7;
  lastRowSeats = 3;
  rows = Math.floor(this.totalSeats / this.seatsInRow);

  constructor() {}

  
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

  //  to check if seats are available in one row
  checkSeatsInRow(row: number, start: number, count: number): boolean {
    for (let i = start; i < start + count; i++) {
      if (this.seatStatus[row][i]) {
        return false;
      }
    }
    return true;
  }

  //  to book seats in one row
  bookSeatsInRow(row: number, start: number, count: number): number[][] {
    let listOfSeatsBooked: number[][] = [];

    for (let i = start; i < start + count; i++) {
      this.seatStatus[row][i] = true;
      listOfSeatsBooked.push([row, i]);
    }
    console.log('yeh rhi', listOfSeatsBooked);
    return listOfSeatsBooked;
  }

  //  to book nearby seats
  bookNearbySeats(count: number): number[][] | null {
    let numberOfNearbySeatsBooked = 0;

    let listOfSeatsBooked: number[][] = [];

    // reserve whatever seats are available
    for (let row = 0; row < this.seatStatus.length; row++) {
      for (let column = 0; column < this.seatStatus[row].length; column++) {
        if (!this.seatStatus[row][column]) {
          this.seatStatus[row][column] = true;
          listOfSeatsBooked.push([row, column]);
          numberOfNearbySeatsBooked++;
        }

        if (numberOfNearbySeatsBooked === count) return listOfSeatsBooked;
      }
    }

    return null; // No nearby seats available
  }

  //  to reserve seats
  reserveSeats(
    count: number,
    numberOfSeatsAvailable: number
  ): number[][] | null {
    if (
      count <= 0 ||
      count > this.seatsInRow ||
      count > numberOfSeatsAvailable
    ) {
      return null; // Invalid number of seats
    }

    // Check if seats are available in one row
    for (let row = 0; row < this.seatStatus.length; row++) {
      for (let seat = 0; seat <= this.seatStatus[row].length - count; seat++) {
        if (this.checkSeatsInRow(row, seat, count)) {
          return this.bookSeatsInRow(row, seat, count);
        }
      }
    }

    // If seats are not available in one row, book nearby seats
    return this.bookNearbySeats(count);
  }
}
