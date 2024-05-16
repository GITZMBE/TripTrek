import { Category, Listing } from "@prisma/client";

export interface ListingWithCategory extends Listing {
  category: Category;
};

export default ListingWithCategory;