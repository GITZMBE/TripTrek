"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/src/components/layout";
import { Listing } from "@prisma/client";
import { useCountries } from "@/src/hooks";
import { CountryModel } from "@/src/models";
import ListingForm from "@/src/components/forms/ListingForm";
import CategoryReactIconModel from "@/src/models/CategoryReactIconModel";
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';

const iconComponents: CategoryReactIconModel[] = [
  new CategoryReactIconModel("beach", <TbBeach className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("windmills", <GiWindmill className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("modern", <MdOutlineVilla className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("countryside", <TbMountain className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("pools", <TbPool className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("islands", <GiIsland className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("lake", <GiBoatFishing className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("skiing", <FaSkiing className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("castles", <GiCastle className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("camping", <GiForestCamp className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("artic", <BsSnow className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("cave", <GiCaveEntrance className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("desert", <GiCactus className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("barns", <GiBarn className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("lux", <IoDiamond className='text-grey w-4 h-4' />),
];

const ListingOwnerPage = ({ params }: { params: { listingId: string } }) => {
  const [ listing, setListing ] = useState<Listing | null>(null);
  const [ location, setLocation ] = useState<CountryModel | null>(null);
  const [ category, setCategory ] = useState<CategoryReactIconModel | null>(null);
  const { getByValue } = useCountries();

  const getListing = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASEURL + `/api/listings/${params.listingId}`,
      { method: "GET", cache: "no-cache" }
    );
    const list: Listing = await res.json();
    setListing(list);
    return list;
  };

  const getLocation = async (value: string) => {
    const country = getByValue(value) || null;
    setLocation(country);
    return country;
  };

  const getCategory = async (cat: string) => {
    const val = iconComponents.filter(c => c.category === cat)[0];
    setCategory(val);
    return val;
  };

  const getData = async () => {
    const list = await getListing();
    getLocation(list?.locationValue);
    getCategory(list.category);
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <Container extraPadding>
      { (listing && location) && (
        <ListingForm listing={listing} location={location} category={category} />
      )}
    </Container>
  );
};

export default ListingOwnerPage;
