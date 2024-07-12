import React from 'react';
// import Step1 from './img/step1.svg';
// import Step2 from '../images/step2.svg';
// import Step3 from '../images/step3.svg';
// import Step4 from '../images/step4.svg';

const HowItWorks = () => {
  return (
    <div className="py-8">
      <div className="">
        <div className="p-8 space-y-8 bg-white">
        <h1 className="mb-8 text-2xl font-bold text-center text-[#023e8a]">How It Works for Buyers</h1>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4 md:items-start md:px-12">
              <div className="flex flex-col items-center justify-center flex-1 p-4">
                {/* <img src='./img/step1.svg' alt="Create an order" className="object-contain w-full h-48" /> */}
                <span className='w-[40px] h-[40px] text-white rounded-full flex items-center justify-center bg-[#023e8a] my-2'>1</span>
                <h3 className="mb-2 text-lg font-semibold text-center">Create an Order</h3>
                <p className="text-sm text-center">Provide your information, the delivery address, and details about the item you want to purchase.</p>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 p-4">
                <span className='w-[40px] h-[40px] text-white rounded-full flex items-center justify-center bg-[#023e8a] my-2'>2</span>

                <h3 className="mb-2 text-lg font-semibold text-center">Send a Custom Message</h3>
                <p className="text-sm text-center">Copy the pre-written message and send it to the seller to coordinate the pick-up time and payment method.</p>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 p-4">
                <span className='w-[40px] h-[40px] text-white rounded-full flex items-center justify-center bg-[#023e8a] my-2'>3</span>

                <h3 className="mb-2 text-lg font-semibold text-center">Schedule Pick-Up</h3>
                <p className="text-sm text-center">The seller will schedule a convenient date and time for us to pick up the item.</p>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 p-4">
                <span className='w-[40px] h-[40px] text-white rounded-full flex items-center justify-center bg-[#023e8a] my-2'>4</span>
                <h3 className="mb-2 text-lg font-semibold text-center">Sit Back and Relax</h3>
                <p className="text-sm text-center">Let SwiftSwap do the rest and bring the package to you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
