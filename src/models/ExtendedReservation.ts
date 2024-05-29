import { Listing, Reservation, User } from "@prisma/client";

export interface ExtendedReservation extends Reservation {
  user: User;
  listing: Listing;
};