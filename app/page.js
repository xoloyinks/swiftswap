"use client"
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
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
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl text-[#023e8a] font-bold mb-4">SwiftSwap Deliveries</h1>
          <p className="text-lg">Delivering your second-hand treasures with care and efficiency. Fill in the form to schedule your delivery.</p>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <FormSteps />
        </div>
      </div>
      <div className='p-0 m-0 w-full'>
        <HowItWorks />
      </div>
      <div>
        <section className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-8">
          <div className="w-full md:w-1/2">
            <Image
              src="/img/seller-partner.png"
              alt="Invite Partners"
              layout="responsive"
              width={500}
              height={300}
              className="object-cover rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 p-4 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Join Us as a <span className=''>Partner</span></h2>
            <p className="mb-4">
              Become a part of the SwiftSwap family and let us help you reach more customers. By joining our partnership program, you can offer your customers a seamless delivery service that they will love.
            </p>
            <Link href="/seller-partner">
              <span className="bg-orange-500 text-white py-2 px-4 py-2 rounded hover:bg-orange-600 transition duration-300">Become a Partner</span>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
