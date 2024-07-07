"use client"
import { useState, useEffect } from 'react';
import Unschedule_Box from './Unschedule';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import SellerPartners from './SellerPartners';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [unscheduledDeliveries, setUnscheduledDeliveries] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [deliveryImage, setDeliveryImage] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [editDeliveryDetails, setEditDeliveryDetails] = useState({
    id: '',
    location: '',
    distance: ''
  });
  const [editOrderDetails, setEditOrderDetails] = useState({
    id: '',
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    deliveryAddress: '',
    itemPrice: '',
    itemDescription: '',
    itemLink: '',
  });

  useEffect(() => {
    // Fetch deliveries (mock data for now)
    const mockDeliveries = [
      { id: 1, date: '2024-07-01', location: 'New York, NY', distance: '5 miles', status: 'Pending', image: null },
      { id: 2, date: '2024-07-01', location: 'Brooklyn, NY', distance: '10 miles', status: 'On Route', image: null },
      { id: 3, date: '2024-07-01', location: 'Queens, NY', distance: '15 miles', status: 'Delivered', image: null },
    ];
    const mockUnscheduledDeliveries = [
      { id: 4, date: '', location: 'New York, NY', distance: '5 miles', status: 'Unscheduled', image: null },
      { id: 5, date: '', location: 'Brooklyn, NY', distance: '10 miles', status: 'Unscheduled', image: null },
    ];
    const mockNewOrders = [
      { id: 6, buyerName: 'John Doe', buyerEmail: 'john@example.com', buyerPhone: '123-456-7890', deliveryAddress: '123 Main St, New York, NY', itemPrice: '$100', itemDescription: 'Laptop', itemLink: 'http://example.com/laptop' },
      { id: 7, buyerName: 'Jane Smith', buyerEmail: 'jane@example.com', buyerPhone: '987-654-3210', deliveryAddress: '456 Elm St, Brooklyn, NY', itemPrice: '$200', itemDescription: 'Phone', itemLink: 'http://example.com/phone' },
    ];
    setDeliveries(mockDeliveries);
    setUnscheduledDeliveries(mockUnscheduledDeliveries);
    setNewOrders(mockNewOrders);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    if (newStatus === 'Delivered') {
      setSelectedDelivery(id);
      setIsPictureModalOpen(true);
    } else if (newStatus === 'Reschedule') {
      setSelectedDelivery(id);
      setIsRescheduleModalOpen(true);
    } else {
      setDeliveries((prevDeliveries) =>
        prevDeliveries.map((delivery) =>
          delivery.id === id ? { ...delivery, status: newStatus } : delivery
        )
      );
    }
  };

  const handleDeliveryClick = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
  };

  const handlePictureModalClose = () => {
    setIsPictureModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleRescheduleModalClose = () => {
    setIsRescheduleModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleEditOrderModalClose = () => {
    setIsEditOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDeliveryImage(URL.createObjectURL(file));
    }
  };

  const handleSubmitPicture = () => {
    if (deliveryImage) {
      setDeliveries((prevDeliveries) =>
        prevDeliveries.map((delivery) =>
          delivery.id === selectedDelivery ? { ...delivery, status: 'Delivered', image: deliveryImage } : delivery
        )
      );
      setDeliveryImage(null);
      handlePictureModalClose();
    }
  };

  const handleCancelDelivery = (id) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.filter((delivery) => delivery.id !== id)
    );
    handleCloseModal();
  };

  const handleRescheduleDelivery = () => {
    if (rescheduleDate) {
      setDeliveries((prevDeliveries) =>
        prevDeliveries.map((delivery) =>
          delivery.id === selectedDelivery ? { ...delivery, date: rescheduleDate, status: 'Rescheduled' } : delivery
        )
      );
      setRescheduleDate('');
      handleRescheduleModalClose();
    }
  };

  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleFilterLocationChange = (e) => {
    setFilterLocation(e.target.value);
  };

  const handleEditDeliveryChange = (e) => {
    const { name, value } = e.target;
    setEditDeliveryDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleEditOrderChange = (e) => {
    const { name, value } = e.target;
    setEditOrderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleEditDeliverySubmit = () => {
    setUnscheduledDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === selectedDelivery ? { ...delivery, ...editDeliveryDetails } : delivery
      )
    );
    handleEditModalClose();
  };

  const handleEditOrderSubmit = () => {
    setNewOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder ? { ...order, ...editOrderDetails } : order
      )
    );
    handleEditOrderModalClose();
  };

  const handleDeleteOrder = (id) => {
    setNewOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const filteredUnscheduledDeliveries = unscheduledDeliveries.filter((delivery) => {
    return (
      (filterDate === '' || delivery.date === filterDate) &&
      (filterLocation === '' || delivery.location.includes(filterLocation))
    );
  });

  return (
    <div className="">
      <NavBar />
      <div className="pt-16 min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Delivery Dashboard</h1>
        <div className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Today's Deliveries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Location</th>
                  <th className="border p-2">Distance</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Delivery Image</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.id} onClick={() => handleDeliveryClick(delivery)} className="cursor-pointer">
                    <td className="border p-2 text-center">{delivery.id}</td>
                    <td className="border p-2 text-center">{delivery.date}</td>
                    <td className="border p-2 text-center">{delivery.location}</td>
                    <td className="border p-2 text-center">{delivery.distance}</td>
                    <td className={`border p-2 text-center ${delivery.status === 'Pending' ? 'text-black' : delivery.status === 'On Route' ? 'text-orange-500' : 'text-green-500'}`}>{delivery.status}</td>
                    <td className="border p-2 text-center">
                      {delivery.image ? <img src={delivery.image} alt="Delivery" className="w-16 h-16 object-cover" /> : 'No Image'}
                    </td>
                    <td className="border p-2 text-center">
                      <select
                        value={delivery.status}
                        onChange={(e) => handleStatusChange(delivery.id, e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="Pending">Pending</option>
                        <option value="On Route">On Route</option>
                        <option value="Delivered">Delivered</option>
                        {/* <option value="Cancel">Cancel</option> */}
                        <option value="Reschedule">Reschedule</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isModalOpen && selectedDelivery && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
              <p><strong>ID:</strong> {selectedDelivery.id}</p>
              <p><strong>Date:</strong> {selectedDelivery.date}</p>
              <p><strong>Location:</strong> {selectedDelivery.location}</p>
              <p><strong>Distance:</strong> {selectedDelivery.distance}</p>
              <p><strong>Status:</strong> {selectedDelivery.status}</p>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Buyer Information</h3>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Contact:</strong> john@example.com</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Seller Information</h3>
                <p><strong>Name:</strong> Jane Smith</p>
                <p><strong>Contact:</strong> jane@example.com</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Delivery Information</h3>
                <p><strong>Address:</strong> {selectedDelivery.location}</p>
                <p><strong>Notes:</strong> Leave at the front door</p>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button onClick={() => handleCancelDelivery(selectedDelivery.id)} className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700">Cancel Delivery</button>
                {/* <button onClick={() => setIsRescheduleModalOpen(true)} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Reschedule Delivery</button> */}
              </div>
            </div>
          </div>
        )}
        {isPictureModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
              <button
                onClick={handlePictureModalClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-4">Take a Picture of the Package</h2>
              <input type="file" accept="image/*" onChange={handlePictureChange} className="mb-4" />
              {deliveryImage && <img src={deliveryImage} alt="Delivery" className="w-full h-48 object-cover mb-4" />}
              <button onClick={handleSubmitPicture} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}
        {isRescheduleModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
              <button
                onClick={handleRescheduleModalClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-4">Reschedule Delivery</h2>
              <input
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <button onClick={handleRescheduleDelivery} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
              <button
                onClick={handleEditModalClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-4">Edit Delivery Details</h2>
              <input
                type="text"
                name="location"
                value={editDeliveryDetails.location}
                onChange={handleEditDeliveryChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Location"
              />
              <input
                type="text"
                name="distance"
                value={editDeliveryDetails.distance}
                onChange={handleEditDeliveryChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Distance"
              />
              <button onClick={handleEditDeliverySubmit} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}
        {isEditOrderModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-lg relative">
              <button
                onClick={handleEditOrderModalClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-4">Edit Order Details</h2>
              <input
                type="text"
                name="buyerName"
                value={editOrderDetails.buyerName}
                onChange={handleEditOrderChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Buyer Name"
              />
              <input
                type="email"
                name="buyerEmail"
                value={editOrderDetails.buyerEmail}
                onChange={handleEditOrderChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Buyer Email"
              />
              <input
                type="text"
                name="buyerPhone"
                value={editOrderDetails.buyerPhone}
                onChange={handleEditOrderChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Buyer Phone"
              />
              <input
                type="text"
                name="deliveryAddress"
                value={editOrderDetails.deliveryAddress}
                onChange={handleEditOrderChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Delivery Address"
              />
              <input
                type="text"
                name="itemPrice"
                value={editOrderDetails.itemPrice}
                onChange={handleEditOrderChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Item Price"
              />
              <textarea
                name="itemDescription"
                value={editOrderDetails.itemDescription}
                onChange={handleEditOrderChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Item Description"
              />
              <input
                type="text"
                name="itemLink"
                value={editOrderDetails.itemLink}
                onChange={handleEditOrderChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Item Link"
              />
              <button onClick={handleEditOrderSubmit} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}
        <div className="bg-white p-6 rounded mb-8">
          <Unschedule_Box />
        </div>
        <div className="bg-white p-6 rounded mb-8">
          <h2 className="text-2xl font-semibold mb-4">New Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Buyer Name</th>
                  <th className="border p-2">Buyer Email</th>
                  <th className="border p-2">Buyer Phone</th>
                  <th className="border p-2">Delivery Address</th>
                  <th className="border p-2">Item Price</th>
                  <th className="border p-2">Item Description</th>
                  <th className="border p-2">Item Link</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {newOrders.map((order) => (
                  <tr key={order.id} className="cursor-pointer">
                    <td className="border p-2 text-center">{order.id}</td>
                    <td className="border p-2 text-center">{order.buyerName}</td>
                    <td className="border p-2 text-center">{order.buyerEmail}</td>
                    <td className="border p-2 text-center">{order.buyerPhone}</td>
                    <td className="border p-2 text-center">{order.deliveryAddress}</td>
                    <td className="border p-2 text-center">{order.itemPrice}</td>
                    <td className="border p-2 text-center">{order.itemDescription}</td>
                    <td className="border p-2 text-center"><a href={order.itemLink} target="_blank" rel="noopener noreferrer">{order.itemLink}</a></td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setEditOrderDetails({
                            id: order.id,
                            buyerName: order.buyerName,
                            buyerEmail: order.buyerEmail,
                            buyerPhone: order.buyerPhone,
                            deliveryAddress: order.deliveryAddress,
                            itemPrice: order.itemPrice,
                            itemDescription: order.itemDescription,
                            itemLink: order.itemLink,
                          });
                          setIsEditOrderModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded mb-8">
          <SellerPartners />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
