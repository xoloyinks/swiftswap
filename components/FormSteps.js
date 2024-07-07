"use client"
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import AddressAutocomplete from './SellerAddressAutocomplete';

const libraries = ['places'];

const FormSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    deliveryAddress: '',
    itemPrice: '',
    itemDescription: '',
    itemLink: '',
    distance: '',
  });
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCfRPl1B_VNo2j4oToAEhHBaiDr54MpA2w', // Replace with your API key
    libraries,
  });

  const steps = ['Buyer Info', 'Item Details', 'Order Summary'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = async () => {
    if (validateForm()) {
      if (currentStep === 2) {
        await calculateDistance();
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission and generate a confirmation number
    const confirmationNum = Math.random().toString(36).substr(2, 9).toUpperCase();
    setConfirmationNumber(confirmationNum);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      buyerName: '',
      buyerEmail: '',
      buyerPhone: '',
      deliveryAddress: '',
      buyerApt: '',
      itemPrice: '',
      itemDescription: '',
      itemLink: '',
      distance: '',
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setConfirmationNumber('');
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const re = /^[0-9\b]+$/;
    return re.test(phone);
  };

  const validateForm = () => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.buyerName) newErrors.buyerName = true;
      if (!validateEmail(formData.buyerEmail)) newErrors.buyerEmail = true;
      if (!validatePhoneNumber(formData.buyerPhone)) newErrors.buyerPhone = true;
      if (!formData.deliveryAddress) newErrors.deliveryAddress = true;
    } else if (currentStep === 2) {
      // if (!formData.itemDescription) newErrors.itemDescription = true;
      if (!formData.itemPrice) newErrors.itemPrice = true;
      if (!formData.itemLink) newErrors.itemLink = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDistance = async () => {
    try {
      const response = await axios.get('/api/getDistance', {
        params: {
          pickupAddress: formData.pickupAddress,
          deliveryAddress: formData.deliveryAddress,
        },
      });

      const distanceInMeters = response.data.distanceInMeters;
      const distanceInMiles = distanceInMeters / 1609.34;
      setFormData({ ...formData, distance: distanceInMiles.toFixed(2) });
      setTotalPrice((distanceInMiles * 1.50).toFixed(2));
    } catch (error) {
      console.error('Error calculating distance:', error);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  // Generate the unique link (in a real application, this would be dynamically generated)
  const uniqueLink = `https://swiftswap.com/schedule/${Math.random().toString(36).substr(2, 9)}`;

  const messageToSeller = `I’m interested in purchasing your product(s). I’ll be using SwiftSwap to handle the pick-up and delivery. They are a trusted delivery service that specializes in marketplace transactions. Could you please select a convenient date and time for the pick-up and specify your preferred payment method using this link: ${uniqueLink} Thanks,`;

  return (
    <div className="w-full">
      {isSubmitted && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4">Order Created Successfully!</h2>
            <p>Your order has been created successfully. Your confirmation number is:</p>
            <p className="text-lg font-bold">{confirmationNumber}</p>
            <div className='overflow-y-auto h-40'>
              <div className="bg-yellow-100 p-4 rounded mt-4">
                <p><strong>Instructions:</strong> Once you send the message to the seller, they will schedule a convenient date and time for us to pick up the item. You will receive a notification and the total amount to pay.</p>
              </div>
              <div className="mt-4 p-4 border bg-white border-gray-300 rounded">
                <p><strong>Copy this Message, and send to Seller:</strong></p>
                <p id="messageToSeller">
                  I’m interested in purchasing your product(s). I’ll be using SwiftSwap to handle the pick-up and delivery. They are a trusted delivery service that specializes in marketplace transactions. Could you please select a convenient date and time for the pick-up and specify your preferred payment method using this link: <br /><br /><a href={uniqueLink} target="_blank" rel="noopener noreferrer">{uniqueLink}</a><br /><br /> Thanks,
                </p>
                <button type="button" onClick={() => copyMessage('messageToSeller')} className="mt-2 py-2 px-4 bg-blue-500 text-white rounded">Copy Message</button>
              </div> 
            </div>           
            <button onClick={handleReset} className="mt-4 py-2 px-4 bg-[#023e8a] text-white rounded">Close</button>
          </div>
        </div>
      )}
      {!isSubmitted && (
        <>
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className={`w-1/3 text-center p-2 ${currentStep === index + 1 ? 'bg-[#023e8a] text-white' : 'bg-gray-200 text-gray-700'}`}>
                {step}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Buyer Information</h2>
                <input type="text" name="buyerName" value={formData.buyerName} onChange={handleChange} placeholder="Buyer Name" className={`w-full p-2 border ${errors.buyerName ? 'border-red-500' : 'border-gray-300'} rounded mb-4`} required />
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input type="email" name="buyerEmail" value={formData.buyerEmail} onChange={handleChange} placeholder="Buyer Email" className={`w-full p-2 border ${errors.buyerEmail ? 'border-red-500' : 'border-gray-300'} rounded mb-4`} required />
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <input type="text" name="buyerPhone" value={formData.buyerPhone} onChange={handleChange} placeholder="Buyer Phone" className={`w-full p-2 border ${errors.buyerPhone ? 'border-red-500' : 'border-gray-300'} rounded mb-4`} required />
                  </div>
                </div>
                <AddressAutocomplete
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  className={`w-full p-2 border 'border-gray-300'} rounded mb-4`}
                  placeholder="Delivery Address"
                />
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input type="text" name="buyerApt" value={formData.buyerApt} onChange={handleChange} placeholder="Apt # (Optional)" className={`w-full p-2 border ${errors.buyerApt ? 'border-red-500' : 'border-gray-300'} rounded mb-4`} required />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Item Details</h2>
                <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} placeholder="Delivery Note (Optional)" className={`w-full p-2 border ${errors.itemDescription ? 'border-red-500' : 'border-gray-300'} rounded mb-4`} />
                <input type="number" name="itemPrice" value={formData.itemPrice} onChange={handleChange} placeholder="Item Price" className={`w-full p-2 border ${errors.itemPrice ? 'border-red-500' : 'border-gray-300'} rounded mb-4`} required />
                <input type="text" name="itemLink" value={formData.itemLink} onChange={handleChange} placeholder="Item Link" className={`w-full p-2 border ${errors.itemLink ? 'border-red-500' : 'border-gray-300'} rounded mb-4`} required />
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <p><strong>Buyer Name:</strong> {formData.buyerName}</p>
                <p><strong>Buyer Email:</strong> {formData.buyerEmail}</p>
                <p><strong>Buyer Phone:</strong> {formData.buyerPhone}</p>
                <p><strong>Delivery Address:</strong> {formData.deliveryAddress}</p>
                <p><strong>Delivery Apt:</strong> {formData.buyerApt}</p>
                <p><strong>Item Description:</strong> {formData.itemDescription}</p>
                <p><strong>Item Price:</strong> {formData.itemPrice}</p>
                <p><strong>Item Link:</strong> <a href={formData.itemLink} target="_blank" rel="noopener noreferrer">{formData.itemLink}</a></p>
                {/* <p><strong>Distance:</strong> {formData.distance} miles</p> */}
                <p><strong>Rate per Mile:</strong> $1.50</p>
                {/* <p><strong>Total Price:</strong> ${totalPrice}</p> */}
              </div>
            )}
            <div className="flex justify-between">
              {currentStep > 1 && <button type="button" onClick={handlePrevious} className="py-2 px-4 bg-gray-500 text-white rounded">Previous</button>}
              {currentStep < steps.length && <button type="button" onClick={handleNext} className="py-2 px-4 bg-[#023e8a] text-white rounded">Next</button>}
              {currentStep === steps.length && <button type="submit" className="py-2 px-4 bg-[#023e8a] text-white rounded">Submit</button>}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

const copyMessage = (messageId) => {
  const messageElement = document.getElementById(messageId);
  const range = document.createRange();
  range.selectNode(messageElement);
  window.getSelection().removeAllRanges();  // clear current selection
  window.getSelection().addRange(range);    // to select text
  document.execCommand('copy');
  window.getSelection().removeAllRanges();  // to deselect
  alert('Message copied to clipboard!');
};

export default FormSteps;
