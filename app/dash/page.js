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
      <div className="min-h-screen p-8 pt-16 bg-gray-100">
        <h1 className="mb-8 text-3xl font-bold text-center">Delivery Dashboard</h1>
        <div className="p-6 mb-8 bg-white rounded shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Today&apos;s Deliveries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Location</th>
                  <th className="p-2 border">Distance</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Delivery Image</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.id} onClick={() => handleDeliveryClick(delivery)} className="cursor-pointer">
                    <td className="p-2 text-center border">{delivery.id}</td>
                    <td className="p-2 text-center border">{delivery.date}</td>
                    <td className="p-2 text-center border">{delivery.location}</td>
                    <td className="p-2 text-center border">{delivery.distance}</td>
                    <td className={`border p-2 text-center ${delivery.status === 'Pending' ? 'text-black' : delivery.status === 'On Route' ? 'text-orange-500' : 'text-green-500'}`}>{delivery.status}</td>
                    <td className="p-2 text-center border">
                      {delivery.image ? <img src={delivery.image} alt="Delivery" className="object-cover w-16 h-16" /> : 'No Image'}
                    </td>
                    <td className="p-2 text-center border">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
              <button
                onClick={handleCloseModal}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Delivery Details</h2>
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
              <div className="flex justify-end mt-4 space-x-4">
                <button onClick={() => handleCancelDelivery(selectedDelivery.id)} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700">Cancel Delivery</button>
                {/* <button onClick={() => setIsRescheduleModalOpen(true)} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Reschedule Delivery</button> */}
              </div>
            </div>
          </div>
        )}
        {isPictureModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
              <button
                onClick={handlePictureModalClose}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Take a Picture of the Package</h2>
              <input type="file" accept="image/*" onChange={handlePictureChange} className="mb-4" />
              {deliveryImage && <img src={deliveryImage} alt="Delivery" className="object-cover w-full h-48 mb-4" />}
              <button onClick={handleSubmitPicture} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}
        {isRescheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
              <button
                onClick={handleRescheduleModalClose}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Reschedule Delivery</h2>
              <input
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <button onClick={handleRescheduleDelivery} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
              <button
                onClick={handleEditModalClose}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Edit Delivery Details</h2>
              <input
                type="text"
                name="location"
                value={editDeliveryDetails.location}
                onChange={handleEditDeliveryChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Location"
              />
              <input
                type="text"
                name="distance"
                value={editDeliveryDetails.distance}
                onChange={handleEditDeliveryChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Distance"
              />
              <button onClick={handleEditDeliverySubmit} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}
        {isEditOrderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded">
              <button
                onClick={handleEditOrderModalClose}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Edit Order Details</h2>
              <input
                type="text"
                name="buyerName"
                value={editOrderDetails.buyerName}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Buyer Name"
              />
              <input
                type="email"
                name="buyerEmail"
                value={editOrderDetails.buyerEmail}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Buyer Email"
              />
              <input
                type="text"
                name="buyerPhone"
                value={editOrderDetails.buyerPhone}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Buyer Phone"
              />
              <input
                type="text"
                name="deliveryAddress"
                value={editOrderDetails.deliveryAddress}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Delivery Address"
              />
              <input
                type="text"
                name="itemPrice"
                value={editOrderDetails.itemPrice}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Item Price"
              />
              <textarea
                name="itemDescription"
                value={editOrderDetails.itemDescription}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Item Description"
              />
              <input
                type="text"
                name="itemLink"
                value={editOrderDetails.itemLink}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Item Link"
              />
              <button onClick={handleEditOrderSubmit} className="w-full py-2 px-4 bg-[#023e8a] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}
        <div className="p-6 mb-8 bg-white rounded">
          <Unschedule_Box />
        </div>
        <div className="p-6 mb-8 bg-white rounded">
          <h2 className="mb-4 text-2xl font-semibold">New Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Buyer Name</th>
                  <th className="p-2 border">Buyer Email</th>
                  <th className="p-2 border">Buyer Phone</th>
                  <th className="p-2 border">Delivery Address</th>
                  <th className="p-2 border">Item Price</th>
                  <th className="p-2 border">Item Description</th>
                  <th className="p-2 border">Item Link</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {newOrders.map((order) => (
                  <tr key={order.id} className="cursor-pointer">
                    <td className="p-2 text-center border">{order.id}</td>
                    <td className="p-2 text-center border">{order.buyerName}</td>
                    <td className="p-2 text-center border">{order.buyerEmail}</td>
                    <td className="p-2 text-center border">{order.buyerPhone}</td>
                    <td className="p-2 text-center border">{order.deliveryAddress}</td>
                    <td className="p-2 text-center border">{order.itemPrice}</td>
                    <td className="p-2 text-center border">{order.itemDescription}</td>
                    <td className="p-2 text-center border"><a href={order.itemLink} target="_blank" rel="noopener noreferrer">{order.itemLink}</a></td>
                    <td className="p-2 text-center border">
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
                        className="px-2 py-1 text-white bg-blue-500 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="px-2 py-1 text-white bg-red-500 rounded"
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
        <div className="p-6 mb-8 bg-white rounded">
          <SellerPartners />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
