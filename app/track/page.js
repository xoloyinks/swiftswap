"use client"
import { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Input } from '@/components/ui/input';
import { FaMapLocationDot } from "react-icons/fa6";
import Image from 'next/image';

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);

  const handleTrack = () => {
    // Mock tracking info
    const mockTrackingData = {
      status: 'Delivered',
      steps: [
        { time: '2024-06-28 08:00', location: 'Warehouse', status: 'Package Received' },
        { time: '2024-06-28 12:00', location: 'On the way', status: 'Out for Delivery' },
        { time: '2024-06-28 15:00', location: 'Destination', status: 'Delivered' },
      ],
    };

    // Simulate API call delay
    setTimeout(() => {
      setTrackingInfo(mockTrackingData);
    }, 1000);
  };

  const handleChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <FaMapLocationDot className='absolute bottom-10 z-50 text-[200px] opacity-50' color='white' />
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="pt-20 mx-5 md:justify-center md:w-9/12 md:flex md:flex-col md:mx-auto md:mt-0">
          <div className='items-center justify-center gap-3 md:flex'>
            <Image
              src={"/img/Location review-bro.png"}
              width={0}
              height={0}
              unoptimized={true}
              alt='Tracking Package'
              className='w-full h-full md:w-1/2'
            />
            <div className='w-full md:w-1/3'>
              <h1 className="mb-2 text-2xl font-bold text-center md:mb-8 md:text-5xl">Track Your <br className='hidden md:block' /> Package</h1>
              <div className="p-3 mb-8 rounded">
                <Input
                  type="text"
                  value={trackingNumber}
                  onChange={handleChange}
                  placeholder="Enter Tracking Number"
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button onClick={handleTrack} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">
                  Track
                </button>
              </div>
            </div>
          </div>
          {trackingInfo && (
            <div className="p-6 bg-white rounded">
              <h2 className="mb-4 text-2xl font-semibold">Tracking Information</h2>
              <ul className="space-y-4">
                {trackingInfo.steps.map((step, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-11/12">
                      <p><strong>Time:</strong> {step.time}</p>
                      <p><strong>Location:</strong> {step.location}</p>
                      <p><strong>Status:</strong> {step.status}</p>
                      <p>
                        <div className="w-3/12 mt-4">
                          {step.status === 'Delivered' && (
                            <img src="/img/delivery.png" alt="Delivered" className="w-500 h-500" />
                          )}
                        </div>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='absolute bottom-0 w-full'>
        <Footer />
      </div>
    </div>

  );
};

export default Track;