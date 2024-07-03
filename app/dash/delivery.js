import { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const DeliveryArea = () => {
  const [deliveries, setDeliveries] = useState([
    // Example delivery data
    {
      id: 1,
      date: '2023-06-25',
      time: '10:00 AM',
      location: 'New York, NY',
      distance: '100 miles',
      amount: '$50',
      status: 'Pending',
    },
    {
      id: 2,
      date: '2023-06-25',
      time: '12:00 PM',
      location: 'Philadelphia, PA',
      distance: '80 miles',
      amount: '$40',
      status: 'Pending',
    },
    {
      id: 3,
      date: '2023-06-25',
      time: '03:00 PM',
      location: 'Washington, DC',
      distance: '120 miles',
      amount: '$60',
      status: 'Pending',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      )
    );
  };

  const today = new Date().toISOString().split('T')[0];

  const todayDeliveries = deliveries.filter(
    (delivery) => delivery.date === today
  );

  return (
    <div>
      <NavBar />
      <div className="pt-16 min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Today's Deliveries</h1>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Deliveries for {today}</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Location</th>
                  <th className="border p-2">Distance</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todayDeliveries.map((delivery) => (
                  <tr key={delivery.id}>
                    <td className="border p-2 text-center">{delivery.id}</td>
                    <td className="border p-2 text-center">{delivery.time}</td>
                    <td className="border p-2 text-center">{delivery.location}</td>
                    <td className="border p-2 text-center">{delivery.distance}</td>
                    <td className="border p-2 text-center">{delivery.amount}</td>
                    <td className="border p-2 text-center">{delivery.status}</td>
                    <td className="border p-2 text-center">
                      <select
                        value={delivery.status}
                        onChange={(e) =>
                          handleStatusChange(delivery.id, e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="On Route">On Route</option>
                        <option value="Picked Up">Picked Up</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeliveryArea;
