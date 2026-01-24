'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { ordersAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FiPackage, FiCalendar, FiMapPin, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchOrder();
  }, [id, isAuthenticated, router]);

  const fetchOrder = async () => {
    try {
      const response = await ordersAPI.getById(id);
      setOrder(response.data.order);
    } catch (error) {
      toast.error('Order not found');
      router.push('/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <p>Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <Link
          href="/orders"
          className="text-gray-600 hover:text-black mb-4 inline-block"
        >
          ← Back to Orders
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <FiCalendar />
                  <span>Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                {order.paidAt && (
                  <div className="flex items-center space-x-1">
                    <FiCheckCircle />
                    <span>Paid on {new Date(order.paidAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex gap-4 border-b pb-4 last:border-0">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image || '/assets/products/default.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.quantity} × PKR {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <FiMapPin />
              <span>Shipping Address</span>
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">{order.shippingAddress.name}</p>
              <p className="text-gray-600">{order.shippingAddress.street}</p>
              <p className="text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p className="text-gray-600">{order.shippingAddress.country}</p>
              <p className="text-gray-600 mt-2">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>PKR {order.itemsPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingPrice === 0 ? 'Free' : `PKR ${order.shippingPrice.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>PKR {order.taxPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span>PKR {order.totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              {order.isPaid ? (
                <span className="text-green-600 font-semibold flex items-center space-x-1">
                  <FiCheckCircle />
                  <span>Payment Received</span>
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Payment Pending</span>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


