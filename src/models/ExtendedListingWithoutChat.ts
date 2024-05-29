import { Category, Listing, Reservation, User } from "@prisma/client";

export interface ExtendedListingWithoutChat extends Listing {
  user: User;
  category: Category;
  reservations: Reservation[];
};