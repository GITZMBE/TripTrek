import { ReactElement } from "react";
import { IconType } from "react-icons";

class CategoryReactIconModel {
  category: string;
  icon: ReactElement<IconType>;

  constructor(category: string, icon: ReactElement<IconType>) {
    this.category = category;
    this.icon = icon;
  }
};

export default CategoryReactIconModel;