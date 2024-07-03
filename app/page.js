"use client"
import Head from 'next/head'
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FormSteps from '../components/FormSteps';
import HowItWorks from '@/components/Howitworks';

export default function Home() {

  return (
    <div>
      <NavBar />
      <div className="pt-16 flex flex-col md:flex-row items-center justify-center bg-gray-100">
        <div className="w-full md:w-1/2 p-20">
          <h1 className="text-3xl text-[#023e8a] font-bold mb-4">SwiftSwap Deliveries</h1>
          <p className="text-lg">Delivering your second-hand treasures with care and efficiency. Fill in the form to schedule your delivery.</p>
        </div>
        <div className="w-full md:w-1/2 p-20">
          <FormSteps />
        </div>
      </div>
      <div className='p-0 m-0 w-full'>
        <HowItWorks />
      </div>
      <Footer />
    </div>
  );
}
