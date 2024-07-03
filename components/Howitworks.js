import React from 'react';
// import Step1 from './img/step1.svg';
// import Step2 from '../images/step2.svg';
// import Step3 from '../images/step3.svg';
// import Step4 from '../images/step4.svg';

const HowItWorks = () => {
  return (
    <div className="">
      <div className="">
        <div className="bg-white p-8 space-y-8">
        <h1 className="text-2xl font-bold text-center mb-8">How It Works for Buyers</h1>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4 items-center">
              <div className="flex-1 p-4">
                {/* <img src='./img/step1.svg' alt="Create an order" className="w-full h-48 object-contain" /> */}
                <h3 className="text-lg font-semibold mb-2 text-center">1. Create an Order</h3>
                <p className="text-center text-sm">Provide your information, the delivery address, and details about the item you want to purchase.</p>
              </div>
              <div className="flex-1 p-4">
                {/* <img src={Step2} alt="Send a custom message" className="w-full h-48 object-contain" /> */}
                <h3 className="text-lg font-semibold mb-2 text-center">2. Send a Custom Message</h3>
                <p className="text-center text-sm">Copy the pre-written message and send it to the seller to coordinate the pick-up time and payment method.</p>
              </div>
              <div className="flex-1 p-4">
                {/* <img src={Step3} alt="Schedule pick-up" className="w-full h-48 object-contain" /> */}
                <h3 className="text-lg font-semibold mb-2 text-center">3. Schedule Pick-Up</h3>
                <p className="text-center text-sm">The seller will schedule a convenient date and time for us to pick up the item.</p>
              </div>
              <div className="flex-1 p-4">
                {/* <img src={Step4} alt="Sit back and relax" className="w-full h-48 object-contain" /> */}
                <h3 className="text-lg font-semibold mb-2 text-center">4. Sit Back and Relax</h3>
                <p className="text-center text-sm">Let SwiftSwap do the rest and bring the package to you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
