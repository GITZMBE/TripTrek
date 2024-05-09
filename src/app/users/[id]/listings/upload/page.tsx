"use client";

import { Container } from "@/src/components/layout";
import {
  CategoryStep,
  DescriptionStep,
  ImageStep,
  LocationStep,
  PriceStep,
} from "@/src/components/listingSteps";
import InfoStep from "@/src/components/listingSteps/InfoStep";
import { CountrySelectValue } from "@/src/components/listingSteps/ui";
import { LoadingAnimation } from "@/src/components/ui";
import { useLoading } from "@/src/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

enum Steps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5,
}

type FormFields = {
  category: string;
  location: CountrySelectValue;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  image: string;
  title: string;
  description: string;
  price: string;
  userId: string;
};

const UploadListingPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [step, setStep] = useState(Steps.Category);
  const { isLoading, setIsLoading } = useLoading();
  const {
    register,
    unregister,
    setValue,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: { userId: params.id, guestCount: 1, roomCount: 1, bathroomCount: 1 },
  });

  const formData = watch();

  const onBack = () => {
    setStep(step - 1);
  };

  const isClickable =
    (step === Steps.Category && formData.category !== undefined) ||
    (step === Steps.Location && formData.location !== undefined) ||
    (step === Steps.Info &&
      formData.guestCount !== undefined &&
      formData.roomCount !== undefined &&
      formData.bathroomCount !== undefined) ||
    (step === Steps.Images && formData.image !== undefined) ||
    (step === Steps.Description &&
      formData.description !== "" &&
      formData.description !== undefined &&
      formData.title !== "" &&
      formData.title !== undefined) ||
    (step === Steps.Price &&
      formData.price !== undefined &&
      !isNaN(parseInt(formData.price)) &&
      parseInt(formData.price) > 0);

  const errorMessages = {
    [Steps.Category]: "Select a category before proceeding",
    [Steps.Location]: "Choose a country before proceeding",
    [Steps.Info]: "Share some information about your listing before proceeding",
    [Steps.Images]: "Share a photo of your listing before proceeding",
    [Steps.Description]: "Fill out required fields before proceeding",
    [Steps.Price]: "Select a price before proceeding",
  };

  const onNext = () => {
    if (isClickable) {
      setStep(step + 1);
    }
  };

  const uploadListing = async (data: FormFields) => {
    const res = await fetch(`${window.location.origin}/api/listings/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newListing = await res.json();
    return newListing;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data, e) => {
    e?.preventDefault();
    try {
      setIsLoading(true);
      const listing = await uploadListing(data);
      router.push('/');
    } catch(error: any) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const onError = (e: any) => console.log(e)

  useEffect(() => {
    clearErrors("root");
  }, [isClickable]);

  return (
    <Container center extraPadding>
      <form
        onSubmit={e => {e.preventDefault();handleSubmit(onSubmit, onError)(e).catch(e => console.log(e))}}
      >
        <div className='flex flex-col gap-2 items-center'>
          {step === Steps.Category ? (
            <CategoryStep
              unregister={unregister}
              setValue={setValue}
              watch={watch}
              name='category'
            />
          ) : step === Steps.Location ? (
            <LocationStep
              unregister={unregister}
              setValue={setValue}
              watch={watch}
              name='location'
            />
          ) : step === Steps.Info ? (
            <InfoStep setValue={setValue} watch={watch} />
          ) : step === Steps.Images ? (
            <ImageStep
              unregister={unregister}
              setValue={setValue}
              watch={watch}
              setError={setError}
              clearErrors={clearErrors}
              errors={errors}
            />
          ) : step === Steps.Description ? (
            <DescriptionStep
              register={register}
              watch={watch}
              errors={errors}
            />
          ) : step === Steps.Price ? (
            <PriceStep register={register} watch={watch} errors={errors} />
          ) : (
            <></>
          )}
          <p className='text-error'>{errors.root?.message || ""}</p>
        </div>
        <div className='w-full max-w-[700px] flex justify-between items-center px-4'>
          <button className={``} onClick={onBack}>
            <span
              className={
                step === Steps.Category
                  ? "hidden"
                  : "flex gap-4 text-grey hover:text-light"
              }
            >
              <FaAngleDoubleLeft size={24} />
              Back
            </span>
          </button>
          {(isClickable && step === Steps.Price) ? (
              <button type="submit" className="relative min-w-64 px-8 py-2 bg-accent/80 hover:bg-accent rounded-lg text-xl text-light text-center" disabled={!isClickable}>
                Post your listing 
                { isLoading && <LoadingAnimation className="absolute -top-1 right-2" width={64} height={64} /> }
              </button>
            ) : (
              <button
                type="button"
                className={`${!isClickable && "cursor-not-allowed"} ${step === Steps.Price && 'hidden'}`}
                onClick={() =>
                  isClickable && step !== Steps.Price
                    ? onNext()
                    : setError("root", {
                        type: "manual",
                        message: errorMessages[step],
                      })
                }
              >
                <span
                  className={`flex gap-4 ${
                    isClickable ? "text-grey hover:text-light" : "text-secondary"
                  }`}
                >
                  Next
                  <FaAngleDoubleRight size={24} />
                </span>
              </button>
            )
          }
        </div>
      </form>
    </Container>
  );
};

export default UploadListingPage;
