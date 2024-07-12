"use client"
import { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const HelpFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questionsAndAnswers = [
    {
      question: "How do I create an order?",
      answer: "To create an order, fill out the form with your details, including the delivery address and item details. Once completed, you'll be able to proceed to the payment page."
    },
    {
      question: "How do I send a custom message to the seller?",
      answer: "After creating your order, you'll be provided with a pre-written message. Copy this message and send it to the seller through the marketplace platform (e.g., Facebook Marketplace, OfferUp). The message will include a link for the seller to schedule a pick-up."
    },
    {
      question: "How does the seller schedule a pick-up?",
      answer: "The seller will click on the link provided in the message and fill out the form to select a convenient date and time for the item to be picked up. They will also provide their payment details."
    },
    {
      question: "How do I pay for the service?",
      answer: "Once the seller schedules the pick-up, you'll be redirected to the payment page where you can review the order summary and complete the payment using Square's payment system."
    },
    {
      question: "What if I need to cancel or reschedule the delivery?",
      answer: "If you need to cancel or reschedule the delivery, please contact our support team as soon as possible. Provide your order details, and we will assist you with the changes."
    },
    {
      question: "How can I track my package?",
      answer: "You can track your package by visiting the 'Track Package' page on our website and entering your tracking number. You'll be able to see the current status and estimated delivery time."
    },
    {
      question: "What are the payment options for the seller?",
      answer: "Sellers can choose their preferred payment method when scheduling the pick-up. Available options include Venmo, CashApp, Cash, and Zelle."
    },
    {
      question: "What should I do if I have an issue with my order?",
      answer: "If you encounter any issues with your order, please contact our support team immediately. Provide your order number and details of the issue, and we will resolve it as quickly as possible."
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="">
      <NavBar />
      <div className="min-h-screen p-8 bg-gray-100 pt-28 md:pt-28">
        <h1 className="mb-8 text-3xl font-bold text-center">Help & FAQ</h1>
        <div className="p-6 space-y-4 bg-white rounded md:w-6/12 md:flex md:flex-col md:mx-auto">
          {questionsAndAnswers.map((item, index) => (
            <div key={index} className="pb-4 border-b border-gray-200">
              <button
                onClick={() => handleToggle(index)}
                className="flex items-center justify-between w-full text-lg font-semibold text-left focus:outline-none"
              >
                {item.question}
                <span>{activeIndex === index ? '-' : '+'}</span>
              </button>
              {activeIndex === index && <p className="mt-2 text-sm text-gray-600 md:tracking-wide">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpFAQ;
