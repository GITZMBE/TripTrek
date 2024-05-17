"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import Icon from "./Icon";

interface CategoryIconProps extends ComponentPropsWithoutRef<"button"> {
  category: string;
}

export const CategoryFilterButton = ({
  category,
  className,
  ...props
}: CategoryIconProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const onClickIcon = () => {
    if (category === "") {
      router.push(pathname);
    } else {
      const newCategory = category.toLowerCase();
      const newUrl = `${pathname}?category=${newCategory}`;
      router.push(newUrl);
      setCurrentCategory(category);
    }
  };

  useEffect(() => {
    const cat = searchParams.get("category");
    setCurrentCategory(cat === null ? "" : cat);
  }, [searchParams]);

  return (
    <button
      className={`group flex flex-col justify-center items-center gap-2 min-w-16 lg:min-w-20 p-2 aspect-square ${
        currentCategory === category?.toLowerCase()
          ? "bg-secondary border-b-2 border-grey"
          : " hover:bg-secondary"
      } ${className}`}
      onClick={() => {
        onClickIcon();
      }}
      disabled={currentCategory === category}
      {...props}
    >
      <Icon
        icon={category}
        className={`w-6 h-6 lg:w-8 lg:h-8 text-grey ${
          currentCategory === category
            ? "text-light"
            : "group-hover:text-light"
        }`}
      />
      <p
        className={`capitalize  text-xs lg:text-xs text-grey ${
          currentCategory === category
            ? "text-light"
            : "group-hover:text-light"
        }`}
      >
        {category}
      </p>
    </button>
  );
};

export default CategoryFilterButton;
