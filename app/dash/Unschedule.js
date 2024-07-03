import React, { useState } from 'react';

const mockData = [
  {
    id: 1,
    orderNumber: '123456',
    cellPhone: '555-1234',
    location: '123 Main St, City, State',
    distance: '5 miles',
    dateExpected: '2023-07-10',
    buyerName: 'John Doe',
    buyerEmail: 'john@example.com',
    buyerPhone: '555-1234',
    pickupAddress: '123 Main St, City, State',
    sellerName: 'Jane Smith',
    sellerEmail: 'jane@example.com',
    sellerPhone: '555-5678',
    deliveryAddress: '456 Elm St, City, State',
  },
  {
    id: 2,
    orderNumber: '654321',
    cellPhone: '555-5678',
    location: '456 Elm St, City, State',
    distance: '10 miles',
    dateExpected: '2023-07-11',
    buyerName: 'Alice Johnson',
    buyerEmail: 'alice@example.com',
    buyerPhone: '555-5678',
    pickupAddress: '789 Pine St, City, State',
    sellerName: 'Bob Brown',
    sellerEmail: 'bob@example.com',
    sellerPhone: '555-9876',
    deliveryAddress: '654 Oak St, City, State',
  },
  // Add more mock data as needed
];

const Dashboard = () => {
  const [unscheduledDeliveries, setUnscheduledDeliveries] = useState(mockData);
  const [filters, setFilters] = useState({
    date: '',
    orderNumber: '',
    cellPhone: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('buyer'); // 'buyer' or 'seller'
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleEdit = (delivery) => {
    setSelectedDelivery(delivery);
    setModalTab('buyer');
    setIsModalOpen(true);
  };

  const handleSchedule = (delivery) => {
    setSelectedDelivery(delivery);
    setModalTab('schedule');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
  };

  const filteredDeliveries = unscheduledDeliveries.filter((delivery) => {
    return (
      (!filters.date || delivery.dateExpected.includes(filters.date)) &&
      (!filters.orderNumber || delivery.orderNumber.includes(filters.orderNumber)) &&
      (!filters.cellPhone || delivery.cellPhone.includes(filters.cellPhone))
    );
  });

  return (
    <div className="">
      <div className="">
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">Unscheduled Deliveries</h2>
          <div className="flex space-x-4 mb-4">
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Filter by Date"
            />
            <input
              type="text"
              name="orderNumber"
              value={filters.orderNumber}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Filter by Order #"
            />
            <input
              type="text"
              name="cellPhone"
              value={filters.cellPhone}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Filter by Cell Phone"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Order #</th>
                  <th className="border p-2">Cell Phone</th>
                  <th className="border p-2">Location</th>
                  <th className="border p-2">Distance</th>
                  <th className="border p-2">Action</th>
                  <th className="border p-2">Date Expected</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id}>
                    <td className="border p-2 text-center">{delivery.id}</td>
                    <td className="border p-2 text-center">{delivery.orderNumber}</td>
                    <td className="border p-2 text-center">{delivery.cellPhone}</td>
                    <td className="border p-2 text-center">{delivery.location}</td>
                    <td className="border p-2 text-center">{delivery.distance}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleEdit(delivery)}
                        className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleSchedule(delivery)}
                        className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-700"
                      >
                        Schedule
                      </button>
                    </td>
                    <td className="border p-2 text-center">{delivery.dateExpected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
              <div className="flex justify-between mb-4">
                <button
                  onClick={() => setModalTab('buyer')}
                  className={`p-2 ${modalTab === 'buyer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                >
                  Buyer
                </button>
                <button
                  onClick={() => setModalTab('seller')}
                  className={`p-2 ${modalTab === 'seller' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                >
                  Seller
                </button>
                <button
                  onClick={() => setModalTab('schedule')}
                  className={`p-2 ${modalTab === 'schedule' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                >
                  Schedule
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Close
                </button>
              </div>
              {modalTab === 'buyer' && (
                <form className="space-y-4">
                  <h2 className="text-xl font-semibold">Edit Buyer Information</h2>
                  <input
                    type="text"
                    name="buyerName"
                    value={selectedDelivery?.buyerName || ''}
                    onChange={() => {}}
                    placeholder="Buyer Name"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="email"
                    name="buyerEmail"
                    value={selectedDelivery?.buyerEmail || ''}
                    onChange={() => {}}
                    placeholder="Buyer Email"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="buyerPhone"
                    value={selectedDelivery?.buyerPhone || ''}
                    onChange={() => {}}
                    placeholder="Buyer Phone"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="pickupAddress"
                    value={selectedDelivery?.pickupAddress || ''}
                    onChange={() => {}}
                    placeholder="Pick-Up Address"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                </form>
              )}
              {modalTab === 'seller' && (
                <form className="space-y-4">
                  <h2 className="text-xl font-semibold">Edit Seller Information</h2>
                  <input
                    type="text"
                    name="sellerName"
                    value={selectedDelivery?.sellerName || ''}
                    onChange={() => {}}
                    placeholder="Seller Name"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="email"
                    name="sellerEmail"
                    value={selectedDelivery?.sellerEmail || ''}
                    onChange={() => {}}
                    placeholder="Seller Email"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="sellerPhone"
                    value={selectedDelivery?.sellerPhone || ''}
                    onChange={() => {}}
                    placeholder="Seller Phone"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={selectedDelivery?.deliveryAddress || ''}
                    onChange={() => {}}
                    placeholder="Delivery Address"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                </form>
              )}
              {modalTab === 'schedule' && (
                <form className="space-y-4">
                  <h2 className="text-xl font-semibold">Schedule Delivery</h2>
                  <input
                    type="date"
                    name="dateExpected"
                    value={selectedDelivery?.dateExpected || ''}
                    onChange={() => {}}
                    placeholder="Expected Delivery Date"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                </form>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
