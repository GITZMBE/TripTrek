import { Category, Listing } from "@prisma/client";

/**
 * @extends Listing
 * @property {Category} - The category of the listing
 */
export interface ListingWithCategory extends Listing {
  category: Category;
};

export default ListingWithCategory;