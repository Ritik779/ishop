import React from "react";
import { FaBox, FaChartBar, FaUsers } from "react-icons/fa";

export default function Admin() {
    return (
        <main className="col-span-4 bg-gray-50 p-4">
            {/* Dashboard Title */}
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            {/* Statistics Section */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Total Sales Card */}
                <div className="bg-white shadow rounded-lg p-4 flex items-center">
                    <div className="text-3xl text-blue-500 mr-4">
                        <FaChartBar />
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500">Total Sales</h2>
                        <p className="text-lg font-bold">$24,000</p>
                    </div>
                </div>

                {/* Total Orders Card */}
                <div className="bg-white shadow rounded-lg p-4 flex items-center">
                    <div className="text-3xl text-green-500 mr-4">
                        <FaBox />
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500">Total Orders</h2>
                        <p className="text-lg font-bold">1,200</p>
                    </div>
                </div>

                {/* Total Customers Card */}
                <div className="bg-white shadow rounded-lg p-4 flex items-center">
                    <div className="text-3xl text-purple-500 mr-4">
                        <FaUsers />
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500">Total Customers</h2>
                        <p className="text-lg font-bold">3,400</p>
                    </div>
                </div>
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-2 px-4 text-sm text-gray-600">ORDER ID</th>
                            <th className="py-2 px-4 text-sm text-gray-600">CUSTOMER</th>
                            <th className="py-2 px-4 text-sm text-gray-600">TOTAL</th>
                            <th className="py-2 px-4 text-sm text-gray-600">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4 text-sm">#12345</td>
                            <td className="py-2 px-4 text-sm">John Doe</td>
                            <td className="py-2 px-4 text-sm">$150.00</td>
                            <td className="py-2 px-4 text-sm">Pending</td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="py-2 px-4 text-sm">#12346</td>
                            <td className="py-2 px-4 text-sm">Jane Smith</td>
                            <td className="py-2 px-4 text-sm">$200.00</td>
                            <td className="py-2 px-4 text-sm">Completed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}
