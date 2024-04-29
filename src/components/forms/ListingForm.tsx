"use client";

import { CountryModel } from "@/src/models";
import { Listing } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  CountrySelect,
  CountrySelectValue,
  UploadImage,
} from "../listingSteps/ui";
import { useErrorMessage, useLoading } from "@/src/hooks";
import { CategorySelector } from "./ui";
import { LoadingAnimation } from "../ui";
import CategoryReactIconModel from "@/src/models/CategoryReactIconModel";

type FormFields = {
  category: CategoryReactIconModel | null;
  location: CountrySelectValue;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  image: string;
  title: string;
  description: string;
  price: string;
};

interface ListingFormProps {
  listing: Listing;
  location: CountryModel;
  category: CategoryReactIconModel | null;
}

const ListingForm = ({ listing, location, category }: ListingFormProps) => {
  const {
    unregister,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      category: category,
      location: location,
      guestCount: listing.guestCount,
      roomCount: listing.roomCount,
      bathroomCount: listing.bathroomCount,
      image: listing.imageSrc,
      title: listing.title,
      description: listing.description,
      price: listing.price.toString(),
    },
  });
  const formData = watch();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const { isLoading, setIsLoading } = useLoading();

  const isUpdateable =
    (formData.category?.category !== listing?.category &&
      formData.category?.category !== "" &&
      formData.category?.category !== null) ||
    (formData.location?.value !== listing?.locationValue &&
      formData.location?.value !== null &&
      formData.location?.value !== undefined) ||
    (formData.guestCount !== listing?.guestCount && formData.guestCount > 0) ||
    (formData.roomCount !== listing?.roomCount && formData.roomCount > 0) ||
    (formData.bathroomCount !== listing?.bathroomCount &&
      formData.bathroomCount > 0) ||
    (formData.image !== listing?.imageSrc &&
      formData.image !== "" &&
      formData.image !== null &&
      formData.image !== undefined) ||
    (formData.title !== listing?.title && formData.title !== "") ||
    (formData.description !== listing?.description &&
      formData.description !== "") ||
    (+formData.price !== listing?.price &&
      !isNaN(parseInt(formData.price)) &&
      +formData.price > 0);

  const updateListing = async (data: FormFields) => {
    const res = await fetch(
      `${window.location.origin}/listings/${listing.id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const updatedListing = await res.json();
    return updatedListing;
  };

  const onUpdateListing = (data: FormFields) => {
    setIsLoading(true);
    updateListing(data);
    setIsLoading(false);
  };

  return (
    <form
      className='w-full max-w-[900px] min-h-screen'
      onSubmit={handleSubmit(onUpdateListing)}
    >
      <div className='flex flex-col items-center py-4 px-4 sm:px-8 md:px-12'>
        <div className='w-full max-w-[900px]'>
          <div
            className={`relative w-full h-[80vh] md:h-[50vh] overflow-hidden`}
          >
            <img
              src={listing.imageSrc}
              className='w-full h-full object-cover object-center object-no-repeat'
              alt=''
            />
            <div className='w-full h-1/2'>
              <UploadImage unregister={unregister} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} errors={errors} />
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-grey'>Guests</label>
              <input type="number" min={1} className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('guestCount')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className='text-grey'>Rooms</label>
              <input type="number" min={1} className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('roomCount')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className='text-grey'>Bathrooms</label>
              <input type="number" min={1} className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('bathroomCount')} />
            </div>
          </div>
          <hr className='w-full border-secondary my-4' />
          <div className='flex flex-col gap-2'>
            <label className='text-light'>Price <span className="text-base text-grey">/ night</span></label>
            <input type='textc' className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('price')} />
          </div>
          <hr className='w-full border-secondary my-4' />
          <div className='w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-grey'>Category</label>
              <CategorySelector
                unregister={unregister}
                watch={watch}
                setValue={setValue}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-grey'>Country</label>
              <CountrySelect
                onChange={(value) =>
                  value !== null
                    ? setValue("location", value)
                    : unregister("location")
                }
                watch={watch}
                name='location'
              />
            </div>
          </div>
          <hr className='w-full border-secondary my-4' />
          <div className='w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-grey'>Title</label>
              <input type="text" className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('title')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className='text-grey'>Description</label>
              <input type="text" className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('description')} />
            </div>
          </div>
        </div>
      </div>
      <p className='text-error'>{errorMessage}</p>
      <div className='w-full flex justify-center items-center mt-8'>
        <button
          type={isLoading || !isUpdateable ? "button" : "submit"}
          className={`flex gap-4 text-grey py-2 px-4 rounded-lg transition bg-secondary ${
            isLoading || !isUpdateable
              ? "hover:text-grey hover:bg-secondary cursor-not-allowed"
              : "hover:text-light hover:bg-grey"
          }`}
          disabled={isLoading || !isUpdateable}
          onClick={() =>
            (isLoading || !isUpdateable) &&
            setErrorMessage("Choose date range before making reservation")
          }
        >
          <span>Update listing</span>
          {isLoading && <LoadingAnimation className='w-12 aspect-square' />}
        </button>
      </div>
    </form>
  );
};

export default ListingForm;
