import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import { FaTags } from "react-icons/fa6";


export default function HowItWorks() {

  const howItWorksForBuyers = [
    {
      title: 'Fill out the Form',
      description: "Provide your information, the delivery address, and details about the item you want to purchase.", 
      img: "Fill out-pana.png"
    },
    {
      title: 'Send Message to Seller',
      description: "Copy the pre-written message and send it to the seller to coordinate the pick-up time and payment method.",
      img: "Sent Message-cuate.png"
    },
    {
      title: 'Wait for Confirmation',
      description: "The seller will schedule a convenient date and time for us to pick up the item. You'll receive a notification with the total amount to pay.",
      img: "Waiting-amico.png"
    }
  ]

  const howItWorksForSellers = [
    {
      title: 'Click the Link',
      description: "Click the link provided by the buyer to access the scheduling form.",
      img: "Duplicate-bro.png"
    },
    {
      title: 'Fill Out the Form',
      description: "Select a convenient date and time for the item to be picked up, and provide your contact and payment details.",
      img: "Fill out-pana.png"
    },
    {
      title: 'Confirm Pickup',
      description: "Confirm the pickup details and get ready for the scheduled pick-up. You will be paid as per your preferred payment method.",
      img: "Authentication-rafiki.png"
    }
  ]
  return (
    <div>
      <NavBar />
      <div className="min-h-screen pt-16 mt-8 text-black md:bg-gray-100">
        <div className="mx-auto md:container">
          <h1 className="flex px-16 py-5 mx-auto mb-2 shadow-md text-sm text-white font-bold text-center rounded-full bg-[#023e8a] w-fit relative border-2 border-white">
            How It Works For Buyers 
            <span className='absolute z-50 text-4xl text-primary -right-2 -bottom-4'><FaTags /></span>
          </h1>
          <div className="mb-5 space-y-8 rounded-xl md:p-6">
          <div className="flex flex-col items-center justify-center md:space-y-4">
            <div className="relative w-8/12 h-[50vh] ">
              {/* Carousel */}
              <Carousel className="w-full px-3 pb-4 shadow-md h-fit md:px-0 md:bg-gradient-to-br from-white to-gray-200 rounded-2xl">
                <CarouselContent className="w-full h-full">
                    {howItWorksForBuyers && howItWorksForBuyers.map((data, index) => {
                      return(
                        <>
                          
                          <CarouselItem key={index} className="h-full">
                              <div className='items-center w-full h-full gap-3 md:flex md:justify-between'>
                                  <Image 
                                      src={`/img/${data.img}`}
                                      width={0}
                                      height={0}
                                      unoptimized={true}
                                      alt='Card Image'
                                      className='flex w-full my-auto md:w-5/12'
                                  />
                                  <div className='flex flex-col gap-3 text-center md:text-left md:w-1/2'>
                                    <span className='text-xs font-bold'>STEP: {index + 1} of {howItWorksForBuyers.length}</span>
                                    <h1 className='text-xl font-bold md:text-2xl'>{data.title}</h1>
                                    <span className='text-sm font-semibold md:text-base'>
                                        {data.description}
                                    </span>
                                  </div>
                              </div>
                          </CarouselItem> 
                        </>
                      )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
          </div>
        </div>
        <div className="mx-auto md:container">
        <h1 className="flex px-16 py-5 mx-auto mb-2 shadow-md text-sm text-white font-bold text-center rounded-full bg-[#023e8a] w-fit relative border-2 border-white">
            How It Works For Sellers 
            <span className='absolute z-50 text-4xl text-primary -right-2 -bottom-4'><FaTags /></span>
          </h1>
          <div className="mb-5 space-y-8 rounded-xl md:p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-8/12 h-[50vh] ">
              {/* Carousel */}
              <Carousel className="w-full h-full shadow-md md:bg-gradient-to-br from-white to-gray-200 rounded-2xl">
                <CarouselContent className="w-full h-full">
                    {howItWorksForSellers && howItWorksForSellers.map((data, index) => {
                      return(
                        <>
                          <CarouselItem className="h-full">
                              <div className='items-center w-full h-full gap-3 md:flex'>
                                  <Image 
                                      src={`/img/${data.img}`}
                                      width={0}
                                      height={0}
                                      unoptimized={true}
                                      alt='Card Image'
                                      className='w-full md:w-1/2'
                                  />
                                  <div className='flex flex-col gap-3 text-center md:text-left md:w-1/2'>
                                    <span className='text-xs font-bold'>STEP: {index + 1} of {howItWorksForSellers.length}</span>
                                    <h1 className='text-xl font-bold md:text-2xl'>{data.title}</h1>
                                    <span className='text-base font-semibold'>
                                        {data.description}
                                    </span>
                                  </div>
                              </div>
                          </CarouselItem> 
                        </>
                      )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
