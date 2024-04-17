import { IconType } from "react-icons";

export class CategoryIconModel {
  category: string;
  icon: IconType;

  constructor(category: string, icon: IconType) {
    this.category = category;
    this.icon = icon;
  }
};

export default CategoryIconModel;