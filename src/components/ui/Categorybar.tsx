"use client";

import React, { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { request } from "@/src/utils";
import CategoryFilterButton from "./CategoryFilterButton";

const Categorybar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const host = window.location.origin;
    const uri = `/api/categories`;
    const options: RequestInit = {
      method: 'GET',
    };
    const userReservations = await request<Category[]>(host, uri, options) || [];
    return userReservations;
  };

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className='flex justify-start xl:justify-center items-center w-full xl:px-12 overflow-y-hidden overflow-x-auto scrollable-container'>
      <div className='flex flex-shrink-1 justify-start items-center'>
        { categories.length > 0 && (
          <>
            <CategoryFilterButton category='' />
            {
              categories.map(({ id, type }) => (
                <CategoryFilterButton key={id} category={type} />
              ))
            }
          </>
        )}
      </div>
    </div>
  );
};

export default Categorybar;
