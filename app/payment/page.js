import React from 'react';
import OrderSummary from '../../components/OrderSummary';
import { fetchOrderDetails } from '../../lib/orderDetails';

export default async function PaymentPage({ searchParams }) {
  const orderDetails = await fetchOrderDetails(searchParams);

  return <OrderSummary orderDetails={orderDetails} />;
}
