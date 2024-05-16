"use client";

import { CountryModel } from "@/src/models";
import { Category, Listing } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  CountrySelect,
  CountrySelectValue,
  UploadImage,
} from "../listingSteps/ui";
import { useLoading } from "@/src/hooks";
import { CategorySelector } from "./ui";
import { LoadingAnimation } from "../ui";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { request } from "@/src/utils";
import ListingWithCategory from "@/src/models/ListingWithCategory";

type FormFields = {
  category: Category | null;
  categoryValue: string;
  location: CountrySelectValue;
  locationValue: string;
  guestCount: string;
  roomCount: string;
  bathroomCount: string;
  image: string;
  title: string;
  description: string;
  price: string;
};

interface ListingFormProps {
  listing: Listing;
  location: CountryModel;
  category: Category | null;
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
      guestCount: listing.guestCount.toString(),
      roomCount: listing.roomCount.toString(),
      bathroomCount: listing.bathroomCount.toString(),
      image: listing.imageSrc,
      title: listing.title,
      description: listing.description,
      price: listing.price.toString(),
    },
  });
  const formData = watch();
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();

  const isUpdateable =
    (formData.category?.id !== listing.id && formData.category !== null) ||
    (formData.location?.value !== listing?.locationValue &&
      formData.location?.value !== null &&
      formData.location?.value !== undefined) ||
    (formData.guestCount !== listing?.guestCount.toString() && parseInt(formData.guestCount.toString()) > 0) ||
    (formData.roomCount !== listing?.roomCount.toString() && parseInt(formData.roomCount.toString()) > 0) ||
    (formData.bathroomCount !== listing?.bathroomCount.toString() && parseInt(formData.bathroomCount.toString()) > 0) ||
    (formData.image !== listing?.imageSrc &&
      formData.image !== "" &&
      formData.image !== null &&
      formData.image !== undefined) ||
    (formData.title.trim() !== listing?.title && formData.title.trim() !== "") ||
    (formData.description.trim() !== listing?.description && formData.description.trim() !== "") ||
    (+formData.price !== listing?.price &&
      !isNaN(parseInt(formData.price)) &&
      +formData.price > 0);

  const updateListing = async (data: any) => {
    const host = window.location.origin;
    const uri = `/api/listings/${listing.id}/update`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const updatedListing = await request<ListingWithCategory | { message: string }>(host, uri, options);
    return updatedListing;
  };

  const onUpdateListing = async (data: FormFields) => {
    try {
      setIsLoading(true);
      const { category, location, ...newData } = data;
      const updatedListing = await updateListing({
        ...newData,
        categoryValue: category,
        locationValue: data.location.value
      });
      if ('message' in updatedListing) {
        setError('root', { message: updatedListing.message });
        toast.error("Message wasn't sent.");
        return;
      }
      toast.success(`'${updatedListing.title}' updated successfully`);
      router.refresh();
    } catch (error: any) {
      setError('root', { message: error.message.toString() });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className='w-full max-w-[900px] min-h-screen'
      onSubmit={handleSubmit(onUpdateListing)}
    >
      <div className='flex flex-col items-center py-4 px-4 sm:px-8 md:px-12'>
        <div className='w-full max-w-[900px] space-y-4'>
          <div
            className={`relative w-full  overflow-hidden`}
          >
            <div className='w-full'>
              <h1 className='text-light text-4xl text-center pb-6'>Edit your listing</h1>
              <div className='flex flex-col center gap-4 w-full'>
                <UploadImage unregister={unregister} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} errors={errors} />
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-grey text-lg'>Guests</label>
              <input type="number" min={1} className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('guestCount')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className='text-grey text-lg'>Rooms</label>
              <input type="number" min={1} className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('roomCount')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className='text-grey text-lg'>Bathrooms</label>
              <input type="number" min={1} className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('bathroomCount')} />
            </div>
          </div>
          <hr className='w-full border-secondary my-4' />
          <div className='flex flex-col gap-2'>
            <label className="text-grey text-lg">Price <span className="text-sm">/ night</span></label>
            <input type='textc' className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('price')} />
          </div>
          <hr className='w-full border-secondary my-4' />
          <div className='w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-grey text-lg'>Category</label>
              <CategorySelector
                unregister={unregister}
                watch={watch}
                setValue={setValue}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-grey text-lg'>Country</label>
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
              <label className='text-grey text-lg'>Title</label>
              <input type="text" className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('title')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className='text-grey text-lg'>Description</label>
              <input type="text" className="w-full py-2 px-4 rounded-md outline-none focus:border-[2px] focus:border-grey" {...register('description')} />
            </div>
          </div>
        </div>
      </div>
      { (errors?.root?.message) && (
        <p className='text-error text-center'>{ errors?.root?.message }</p>
      )}
      <div className='w-full flex justify-center items-center mt-8'>
        <button
          type={isLoading || !isUpdateable ? "button" : "submit"}
          className={`flex gap-4 text-grey py-2 px-4 border-2 rounded-lg transition ${
            isLoading || !isUpdateable
              ? "text-secondary border-secondary cursor-not-allowed"
              : "text-grey hover:text-light border-grey hover:bg-grey"
          }`}
          onClick={() =>
            (isLoading || !isUpdateable) &&
            setError('root', { message: "Change something in listing before saving" })
          }
        >
          <span>Save Changes</span>
          {isLoading && <LoadingAnimation className='w-12 aspect-square' />}
        </button>
      </div>
    </form>
  );
};

export default ListingForm;
