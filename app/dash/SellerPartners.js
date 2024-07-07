"use client"
import { useState } from 'react';

const SellerPartners = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const mockupData = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      businessName: 'John’s Store',
      itemSold: 'Electronics',
      pickUpTime: '10 AM - 4 PM',
      idFront: 'path/to/idFront.jpg',
      idBack: 'path/to/idBack.jpg',
      platforms: ['Facebook', 'eBay'],
      paymentMethod: 'PayPal',
    },
    // Add more mockup data as needed
  ];

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seller Partners</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Business Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockupData.map((seller) => (
              <tr key={seller.id} onClick={() => handleSellerClick(seller)} className="cursor-pointer">
                <td className="py-2 px-4 border-b">{seller.firstName} {seller.lastName}</td>
                <td className="py-2 px-4 border-b">{seller.businessName}</td>
                <td className="py-2 px-4 border-b">{seller.location}</td>
                <td className="py-2 px-4 border-b">{seller.phone}</td>
                <td className="py-2 px-4 border-b">{seller.email}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button className="bg-red-500 text-white py-1 px-2 rounded" onClick={() => handleStatusChange('deny')}>Deny</button>
                  <button className="bg-green-500 text-white py-1 px-2 rounded" onClick={() => handleStatusChange('approve')}>Approve</button>
                  <button className="bg-yellow-500 text-white py-1 px-2 rounded" onClick={() => handleStatusChange('missing')}>Missing</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSeller && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full md:w-1/2 mx-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Seller Information</h2>
              <button className="text-red-500" onClick={() => setSelectedSeller(null)}>X</button>
            </div>
            <p><strong>First Name:</strong> {selectedSeller.firstName}</p>
            <p><strong>Last Name:</strong> {selectedSeller.lastName}</p>
            <p><strong>Phone:</strong> {selectedSeller.phone}</p>
            <p><strong>Email:</strong> {selectedSeller.email}</p>
            <p><strong>Business Name:</strong> {selectedSeller.businessName}</p>
            <p><strong>Item Sold:</strong> {selectedSeller.itemSold}</p>
            <p><strong>Pick Up Time:</strong> {selectedSeller.pickUpTime}</p>
            <p><strong>ID Front:</strong> <img src={selectedSeller.idFront} alt="ID Front" /></p>
            <p><strong>ID Back:</strong> <img src={selectedSeller.idBack} alt="ID Back" /></p>
            <p><strong>Platforms:</strong> {selectedSeller.platforms.join(', ')}</p>
            <p><strong>Payment Method:</strong> {selectedSeller.paymentMethod}</p>
          </div>
        </div>
      )}

      {isMessageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full md:w-1/2 mx-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Send Message</h2>
              <button className="text-red-500" onClick={() => setIsMessageModalOpen(false)}>X</button>
            </div>
            <textarea
              className="w-full h-40 p-2 border rounded"
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="bg-gray-500 text-white py-1 px-4 rounded" onClick={() => setIsMessageModalOpen(false)}>Close</button>
              <button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={handleSendMessage}>Send Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPartners;
