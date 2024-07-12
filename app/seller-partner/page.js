"use client"
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import AddressAutocomplete from '../../components/SellerAddressAutocomplete';
import TermsAndConditionsModal from '../../components/TermsAndConditionsModal';
import SuccessMessage from '../../components/SuccessMessage';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { LuListChecks } from "react-icons/lu";


const libraries = ['places'];

const SellerPartner = () => {

  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');

    const handleSellerClick = (seller) => {
    setSelectedSeller(seller);
  };

  const handleStatusChange = (status) => {
    if (status === 'missing') {
      setIsMessageModalOpen(true);
    } else {
      // Handle approve or deny logic
    }
  };

  const handleSendMessage = () => {
    // Logic to send message to the partner
    setIsMessageModalOpen(false);
  };

  const [formData, setFormData] = useState({
    // pickupDate: '',
    pickupTimeFrom: '',
    pickupTimeTo: '',
    pickupAddress: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    businessName: '',
    itemTypes: '',
    paymentMethod: '',
    agreeTerms: false,
    idFront: null,
    idBack: null,
  });
  const [errors, setErrors] = useState({});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCfRPl1B_VNo2j4oToAEhHBaiDr54MpA2w', // Replace with your API key
    libraries,
  });

  const [showTerms, setShowTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const platforms = [
    { value: 'Facebook Marketplace', label: 'Facebook Marketplace' },
    { value: 'OfferUp', label: 'OfferUp' },
    { value: 'Craigslist', label: 'Craigslist' },
    { value: 'eBay', label: 'eBay' },
    { value: 'Etsy', label: 'Etsy' },
  ];

  const handlePlatformChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedPlatforms(value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      businessName,
      location,
      phoneNumber,
      email,
      platforms: selectedPlatforms.map(platform => platform.value)
    };
    // Handle form submission, including file uploads
    console.log('Form Data:', formData);
    setShowSuccess(true);
  };

  const validateForm = () => {
    let newErrors = {};
    // if (!formData.pickupDate) newErrors.pickupDate = true;
    if (!formData.pickupTimeFrom) newErrors.pickupTime = true;
    if (!formData.pickupTimeTo) newErrors.pickupTime = true;
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

//   if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="">
        <NavBar />
            <div className="min-h-screen p-4 bg-gray-100 pt-28 md:pt-28 ">
                <h1 className="mb-8 text-3xl font-bold text-center">Become a SwiftSwap Partner</h1>
                {showSuccess ? (
                    <SuccessMessage />
                ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded md:w-7/12 md:flex md:flex-col md:mx-auto">
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700">First Name:</label>
                    <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label className="block text-gray-700">Last Name:</label>
                    <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                  </div>
                </div>
                <div>
                    <label className="block text-gray-700">Phone Number:</label>
                    <Input
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
                    <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                </div>
                <div>
                <label className="block text-gray-700">Business Name</label>
                <Input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className={`mt-1 p-2 border border-gray-300 rounded w-full`}
                />
                </div>
                <div>
                    <label className="text-gray-700 fblock">Types of Items Sold</label>
                    <Textarea
                        name="itemTypes"
                        value={formData.itemTypes}
                        onChange={handleChange}
                        className={`mt-1 p-2 border ${errors.itemTypes ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                        required
                    ></Textarea>
                </div>
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700">Select a Pick-Up Time From:</label>
                    <input
                    type="time"
                    name="pickupTimeFrom"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.pickupTimeFrom ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700">Select a Pick-Up Time To:</label>
                    <input
                    type="time"
                    name="pickupTimeTo"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.pickupTimeTo ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    required
                    />
                  </div>
                </div>
                <div className='w-full'>
                    <label className="block text-gray-700">Pick-Up Address:</label>
                    <AddressAutocomplete
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    placeholder="Enter pick-up address"
                    className={`mt-1 p-2 border ${errors.pickupAddress ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    />
                </div>
                    <label className="block text-gray-700">Upload ID Front</label>
                    <input
                        type="file"
                        name="idFront"
                        onChange={handleChange}
                        className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-md"
                        required
                    />
                    <label className="block text-gray-700">Upload ID Back</label>
                    <input
                        type="file"
                        name="idBack"
                        onChange={handleChange}
                        className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-md"
                        required
                    />
                <div className='flex flex-col md:justify-between md:items-center md:flex-row md:-mx-3'>
                  <div className="mb-4 md:mb-0 md:w-6/12 md:px-3">
                    <label className="block text-gray-700">Platforms</label>
                    <Select
                      isMulti
                      options={platforms}
                      value={selectedPlatforms}
                      onChange={setSelectedPlatforms}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                  <div className='md:w-6/12 md:px-3'>
                      <label className="block text-gray-700">Payment Method:</label>
                      <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className={`mt-1 p-2 border ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'} rounded w-full` }
                      required
                      >
                      <option value="">Select Payment Method</option>
                      <option value="Venmo">Venmo</option>
                      <option value="CashApp">CashApp</option>
                      <option value="Cash">Cash</option>
                      <option value="Zelle">Zelle</option>
                      </select>
                  </div>
                </div>
                <label className="inline-flex items-center mt-3">
                {/* <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-5 h-5 text-gray-600 form-checkbox"
                  required
                /> */}
                <Checkbox
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />

                <span className="ml-2 text-sm text-gray-700">
                  I agree to the{' '}
                  <span
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={() => setShowTerms(true)}
                  >
                    terms and conditions
                  </span>
                </span>
              </label>
                <button type="submit" className="w-full px-4 py-2 text-white rounded-xl bg-[#023e8a] hover:bg-blue-700 md:w-fit md:text-sm md:font-semibold md:px-16 flex items-center md:mx-auto gap-2">
                    Submit
                    <LuListChecks className='text-xl' />
                </button>
                </form>
                )}
            </div>
            {showTerms && <TermsAndConditionsModal onClose={() => setShowTerms(false)} />}
        <Footer />
    </div>
  );
};

export default SellerPartner;
