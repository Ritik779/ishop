"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Default styles
import "react-date-range/dist/theme/default.css"; // Theme
import { format } from "date-fns";
import { axiosInstance, capitalizeWords, formatDate, getKeyByValue } from "@/library/helper";

const Transaction = () => {
    const router = useRouter();
    const [transactions, setTransactions] = useState([]);
    const [filters, setFilters] = useState({
        dateRange: null,
        orderId: "",
        transactionId: "",
        name: "",
        email: "",
        status: "",
    });
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleDateChange = (ranges) => {
        setDateRange([ranges.selection]);
        setFilters({
            ...filters,
            dateRange: {
                startDate: format(ranges.selection.startDate, "yyyy-MM-dd"),
                endDate: format(ranges.selection.endDate, "yyyy-MM-dd"),
            },
        });
    };

    const time = new Date();

    const generatePDF = (transaction) => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(25);
        doc.setTextColor("Red");
        doc.text("iShop", 90, 10);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        doc.setTextColor("black");
        doc.text("Transaction Receipt", 20, 20);
        doc.setFontSize(12);
        doc.text(`Transaction ID: ${transaction._id}`, 20, 30);
        doc.text(`Order ID: ${transaction.order_id._id}`, 20, 40);
        doc.text("Customer Details:", 20, 50);
        doc.text(`Name: ${transaction.user_id.name}`, 30, 60);
        doc.text(`Email: ${transaction.user_id.email}`, 30, 70);
        doc.text(`Contact: +91-${transaction.user_id.contact}`, 30, 80);
        doc.text("Payment Details:", 20, 90);
        doc.text(`Total: $${transaction.order_id.final_total}`, 30, 100);
        doc.text(`Status: ${payment_status[transaction.order_id.payment_status]}`, 30, 110);
        doc.text(`Payment ID: ${transaction.razorpay_payment_id}`, 30, 120);
        doc.text(`Razorpay Order ID: ${transaction.razorpay_order_id}`, 30, 130);
        doc.text(`Signature: ${transaction.razorpay_signature}`, 30, 140);
        doc.text(`Date: ${formatDate(transaction.createdAt)}`, 20, 150);
        doc.setTextColor("blue");
        doc.text("Thank you for shopping with us!", 70, 160);
        doc.text("Powered by iShop", 83, 170);
        doc.setTextColor("black");
        doc.text(`${format(time, "yyyy-MM-dd HH:mm:ss")}`, 150, 180);
        doc.save("Transaction_Receipt.pdf");
      };
      

    const fetchData = async () => {
        const response = await axiosInstance.get("/transaction");
        setTransactions(response.data.transactions);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value.trim() });
    };
    const payment_status = {
        0: "Pending",
        1: "Success",
        2: "Failed",
        3: "Refund Init",
        4: "Refunded",
    };
    const searchHandler = async () => {
        setShowCalendar(false);
        const searchQuery = new URLSearchParams();
        if (filters.orderId) searchQuery.append("order_id", filters.orderId);
        if (filters.transactionId)
            searchQuery.append("transaction_id", filters.transactionId);
        if (filters.name) searchQuery.append("name", capitalizeWords(filters.name));
        if (filters.email) searchQuery.append("email", filters.email.toLowerCase());
        if (filters.status)
            searchQuery.append(
                "status",
                getKeyByValue(payment_status, filters.status)
            );
        if (filters.dateRange) {
            searchQuery.append("startDate", filters.dateRange.startDate);
            searchQuery.append("endDate", filters.dateRange.endDate);
        }

        const queryString = searchQuery.toString();
        console.log("Query String:", queryString);
        const response = await axiosInstance.get(`/transaction?${queryString}`);
        setTransactions(response.data.transactions);
    };


    return (
        <div className="mt-8 px-5 col-span-4">
            <div className="grid grid-cols-3 gap-4 bg-gray-100 p-4 rounded mb-6 relative">
                <input
                    type="text"
                    name="orderId"
                    placeholder="Order ID"
                    className="p-2 border rounded"
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="transactionId"
                    placeholder="Transaction ID"
                    className="p-2 border rounded"
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="p-2 border rounded"
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="p-2 border rounded"
                    onChange={handleFilterChange}
                />
                <select
                    name="status"
                    className="p-2 border rounded"
                    onChange={handleFilterChange}
                >
                    <option value="">Select Payment Status</option>
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                </select>

                {/* Date Range Picker */}
                <div className="relative">
                    <button
                        className="p-2 border rounded bg-white w-full text-left"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        {`${format(dateRange[0].startDate, "yyyy-MM-dd")} to ${format(
                            dateRange[0].endDate,
                            "yyyy-MM-dd"
                        )}`}
                    </button>
                    {showCalendar && (
                        <div className="absolute z-50 bg-white shadow-md p-2 mt-2">
                            <DateRange
                                editableDateInputs={true}
                                onChange={handleDateChange}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={searchHandler}
                        className="bg-blue-500 text-white p-2 rounded w-fit"
                    >
                        Search
                    </button>
                </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rtl:text-right">
                <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">S.No</th>
                        <th className="px-6 py-3">Transaction</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Payment ID</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Download</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.length === 0 ? (
                        <tr className="text-center w-full">
                            <td colSpan="8" className="py-4 font-semibold text-gray-600">
                                No transactions!
                            </td>
                        </tr>
                    ) : (
                        transactions?.map((transaction, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                            >
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    <span className="font-bold">Transaction ID:</span> {transaction?._id}
                                    <br />
                                    <span className="font-bold">Order ID:</span> {transaction?.order_id?._id}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold">{transaction?.user_id?.name}</span>
                                    <br />
                                    {transaction?.user_id?.email}
                                    <br />
                                    +91-{transaction?.user_id?.phone}
                                </td>
                                <td className="px-6 py-4">${transaction?.order_id?.final_total}</td>
                                <td className="px-6 py-4">{payment_status[transaction?.order_id?.payment_status]}</td>
                                <td className="px-6 py-4">{transaction?.razorpay_payment_id}</td>
                                <td className="px-6 py-4">{formatDate(transaction?.createdAt)}</td>
                                <td className="px-6 py-4">
                                    <FaDownload onClick={() => generatePDF(transaction)} className="cursor-pointer text-blue-600" />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Transaction;
