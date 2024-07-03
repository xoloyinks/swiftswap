"use client"
import { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

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
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Track Your Package</h1>
          <div className="bg-white p-6 rounded mb-8">
            <input
              type="text"
              value={trackingNumber}
              onChange={handleChange}
              placeholder="Enter Tracking Number"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button onClick={handleTrack} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">
              Track
            </button>
          </div>
          {trackingInfo && (
            <div className="bg-white p-6 rounded">
              <h2 className="text-2xl font-semibold mb-4">Tracking Information</h2>
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
      <Footer />
    </div>

  );
};

export default Track;