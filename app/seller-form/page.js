"use client"
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import AddressAutocomplete from '../../components/SellerAddressAutocomplete';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const libraries = ['places'];

const SellerForm = () => {
  const [formData, setFormData] = useState({
    pickupDate: '',
    pickupTime: '',
    pickupAddress: '',
    price: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    paymentMethod: '',
  });
  const [errors, setErrors] = useState({});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCfRPl1B_VNo2j4oToAEhHBaiDr54MpA2w', // Replace with your API key
    libraries,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.pickupDate) newErrors.pickupDate = true;
    if (!formData.pickupTime) newErrors.pickupTime = true;
    if (!formData.pickupAddress) newErrors.pickupAddress = true;
    if (!formData.price) newErrors.price = true;
    if (!formData.firstName) newErrors.firstName = true;
    if (!formData.lastName) newErrors.lastName = true;
    if (!formData.phoneNumber) newErrors.phoneNumber = true;
    if (!validateEmail(formData.email)) newErrors.email = true;
    if (!formData.paymentMethod) newErrors.paymentMethod = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="">
        <NavBar />
            <div className="pt-16 min-h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Schedule Pick-Up</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded space-y-4">
                <div>
                    <label className="block text-gray-700">Select a Date:</label>
                    <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.pickupDate ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Select a Time:</label>
                    <input
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.pickupTime ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Pick-Up Address:</label>
                    <AddressAutocomplete
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    placeholder="Enter pick-up address"
                    className={`mt-1 p-2 border ${errors.pickupAddress ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Price:</label>
                    <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">First Name:</label>
                    <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Last Name:</label>
                    <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Phone Number:</label>
                    <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email:</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Payment Method:</label>
                    <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    >
                    <option value="">Select Payment Method</option>
                    <option value="Venmo">Venmo</option>
                    <option value="CashApp">CashApp</option>
                    <option value="Cash">Cash</option>
                    <option value="Zelle">Zelle</option>
                    </select>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Submit
                </button>
                </form>
            </div>
        <Footer />
    </div>
  );
};

export default SellerForm;
