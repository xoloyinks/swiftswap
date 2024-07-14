"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderSummary = ({ location }) => {
  const [orderDetails, setOrderDetails] = useState(location.state.orderDetails);
  const [distance, setDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // useEffect(() => {
  //   calculateDistance();
  // }, []);

  // const calculateDistance = async () => {
    // try {
    //   const response = await axios.get('/api/getDistance', {
    //     params: {
    //       pickupAddress: orderDetails.pickupAddress,
    //       deliveryAddress: orderDetails.deliveryAddress,
    //     },
    //   });

    //   const distanceInMeters = response.data.distanceInMeters;
    //   const distanceInMiles = distanceInMeters / 1609.34;
    //   setDistance(distanceInMiles.toFixed(2));
    //   setTotalCost((distanceInMiles * 1.50).toFixed(2)); // Assuming $1.50 per mile
    // } catch (error) {
    //   console.error('Error calculating distance:', error);
    // }
  // };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Order Summary</h1>
        <div className="p-6 space-y-8 bg-white rounded shadow-md">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Summary</h2>
            <div className="space-y-2">
              <p><strong>Buyer Name:</strong> {orderDetails.buyerName}</p>
              <p><strong>Buyer Email:</strong> {orderDetails.buyerEmail}</p>
              <p><strong>Buyer Phone:</strong> {orderDetails.buyerPhone}</p>
              <p><strong>Pick-Up Address:</strong> {orderDetails.pickupAddress}</p>
              <p><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
              <p><strong>Item Description:</strong> {orderDetails.itemDescription}</p>
              <p><strong>Item Price:</strong> ${orderDetails.itemPrice}</p>
              <p><strong>Distance:</strong> {distance} miles</p>
              <p><strong>Rate per Mile:</strong> $1.50</p>
              <p><strong>Total Cost:</strong> ${totalCost}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Payment</h2>
              <div className="space-y-4">
                {/* Payment form or integration goes here */}
                <p>Payment form will be integrated here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
