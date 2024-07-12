"use client"
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FormSteps from '../components/FormSteps';
import HowItWorks from '@/components/Howitworks';
import { TbTruckDelivery } from "react-icons/tb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ImCross } from "react-icons/im";
import { LuGrid } from 'react-icons/lu'


export default function Home() {

  return (
    <div>
      <NavBar />
      <div className="relative flex flex-col items-center justify-center pt-16 overflow-hidden bg-gradient-to-tr from-gray-100 to-primary/50 md:flex-row md:px-16">
        <div className="relative w-full p-8 overflow-y-hidden text-center md:items-center md:w-full md:flex md:flex-col md:justify-center md:py-32 md:h-full">
          <h1 className="text-4xl md:text-4xl text-[#023e8a] font-bold mb-4">SwiftSwap <br className='block md:hidden' /> Deliveries</h1>
          <p className="text-base font-semibold text-center text-black md:w-1/2">Delivering your second-hand treasures with care and efficiency. Fill in the form to schedule your delivery.</p>
          {/* Mobile View truck icon */}
          <TbTruckDelivery  className='absolute text-[200px]  block md:hidden -bottom-8 z-30 -left-10 text-[#023e8a] opacity-5' />
          <AlertDialog>
          <AlertDialogTrigger className='hidden px-16 rounded-xl py-3 text-sm text-white font-semibold md:block my-10 bg-gradient-to-br from-[#023e8a] to-[#023d8a97] hover:bg-[#023e8a]'>
              Fill Form
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className='flex justify-between'>
              <span>
                  <Image
                    src="/logo/swiftswap-blue-logo.svg"
                    width={150}
                    height={150}
                    alt="Picture of the author"
                />
              </span>
              <AlertDialogCancel className=" w-fit"><ImCross /></AlertDialogCancel>
            </div>
            <FormSteps />
          </AlertDialogContent>
          
          </AlertDialog>

        </div>

        <div className="w-full p-8 md:hidden">
          <FormSteps />
        </div>
        {/* Desktop View truck icon */}
        <TbTruckDelivery  className='absolute text-[300px] md:text-[400px] md:block hidden -bottom-16 z-30 -left-10 text-[#023e8a] opacity-10 md:opacity-10' />
        <LuGrid className='absolute z-50 -bottom-10 -right-10 text-[200px] text-[#023e8a] opacity-10 hidden md:block rotate-45' />
        
      </div>
      <div className='w-full p-0 m-0'>
        <HowItWorks />
      </div>
      
      {/* Join us Mobile view */}
        <section className="flex flex-col items-center justify-between p-8 bg-gray-100 md:hidden">
          <div className="w-full md:w-1/2">
            <Image
              src="/img/pexels-fauxels-3184294.jpg"
              alt="Invite Partners"
              layout="responsive"
              width={500}
              height={300}
              className="object-cover rounded-md"
            />
          </div>
          <div className="w-full p-4 text-center md:w-1/2 md:text-left">
            <h2 className="mb-4 text-2xl font-bold">Partner with us!</h2>
            <p className="mb-8 text-sm font-semibold">
              Become a part of the SwiftSwap family and let us help you reach more customers. By joining our partnership program, you can offer your customers a seamless delivery service that they will love.
            </p>
            <Link href="/seller-partner">
              <span className="px-8 py-3 text-sm text-white transition duration-300 bg-orange-500 rounded-xl hover:bg-orange-600">Become a Partner</span>
            </Link>
          </div>
        </section>

        {/* Join us Desktop view */}
        <section className='md:flex hidden relative mx-auto md:w-[900px] md:rounded-3xl overflow-hidden bg-black md:h-[500px]'>
          <Image
                src="/img/pexels-fauxels-3184294.jpg"
                alt="Invite Partners"
                layout="responsive"
                width={0}
                height={0}
                className="absolute w-full h-full"
          />
          <div className='absolute z-50 w-full h-full bg-black/70'>
              <div className='flex flex-col items-center justify-center w-full h-full gap-5 text-white'>
                <h2 className="w-1/2 mb-4 text-3xl font-bold text-center text-gray-300">Partner with us!</h2>
                <p className="w-1/2 mb-4 text-sm font-semibold tracking-wide text-center text-gray-300">
                  Become a part of the SwiftSwap family and let us help you reach more customers. By joining our partnership program, you can offer your customers a seamless delivery service that they will love.
                </p>
                <Link href="/seller-partner" className='flex justify-center w-1/2 mx-auto'>
                  <span className="px-8 py-3 mx-auto text-sm font-semibold tracking-wider text-white transition duration-300 bg-orange-500 rounded-3xl hover:bg-orange-600">Become a Partner</span>
                </Link>
              </div>
          </div>
            <Image
              src="/logo/swiftswap-blue-logo.svg"
              width={150}
              height={150}
              alt="Picture of the author"
              className='absolute z-50 top-5 left-10'
            />
        </section>
      <Footer />
    </div>
  );
}
