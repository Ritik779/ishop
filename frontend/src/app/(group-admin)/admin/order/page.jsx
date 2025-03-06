import PageHeader from '@/components/admin/PageHeader';
import { getAllOrders } from '@/library/api-calls';
import { formatDate } from '@/library/helper';
import React from 'react'

export default async function Order() {
  const orders = await getAllOrders();

  const paymentStatusMap = {
    0: "Pending",
    1: "Success",
    2: "Failed",
    3: "Refund Init",
    4: "Refunded"
  };

  const orderStatusMap = {
    0: "Waiting for Payment",
    1: "Order Placed",
    2: "Order Packed",
    3: "Order Dispatched",
    4: "Order Shipped",
    5: "Out for Delivery",
    6: "Delivered",
    7: "Order Canceled"
  };

  return (
    <main className='col-span-4 rounded-md bg-white p-6'>
      <PageHeader breadcurms={["Dashboard", "Orders"]} name={"Orders"} />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-left">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Mode</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3">Order Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{order._id}</td>
                <td className="px-6 py-4">{order.user_id.name} <br /> {order.user_id.email}</td>
                <td className="px-6 py-4">
                  {order.products.map((product, i) => (
                    <span key={i} className="block">{product.quantity} x {product.name}</span>
                  ))}
                </td>
                <td className="px-6 py-4">{order.final_total}</td>
                <td className="px-6 py-4">{order.payment_method === 0 ? "Cash On Delivery" : "Razorpay"}</td>
                <td className='px-6 py-4'>{paymentStatusMap[order.payment_status]}</td>
                <td className='px-6 py-4'>{orderStatusMap[order.order_status]}</td>
                <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
