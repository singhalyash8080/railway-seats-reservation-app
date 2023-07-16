# railway-seats-reservation-app

A simple railway seat reservation app for a train coach(80 seats, 7 in each row, and 3 in the last row) in Angular, with only the number of seats as input.

## Assumptions made

1. The client app is managing the whole state and the system will refresh upon loading, hence is no need for a database.
2. Nearby seat reservation means - reserving seats with the maximum number of consecutive seats possible in a row and rest in some other row.
3. No need to capture passenger details, since only the number of seats is required. In case passenger details are also captured then a proper backend with a database could be used to associate each passenger having a unique id with the reserved seats.
