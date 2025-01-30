import Link from 'next/link';
import React from 'react'
import { FaChartBar, FaTh, FaTags, FaBox, FaPalette, FaRuler, FaClipboardList, FaMoneyBill, FaUsers, FaUserShield } from "react-icons/fa";

export default function Sidebar() {
    return (
        <>
            <aside className="col-span-1 bg-gray-100 p-4 shadow-md">
                <nav className="space-y-8">
                    {/* Overview Section */}
                    <div>
                        <h2 className="text-gray-600 uppercase text-sm font-semibold mb-3">Overview</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaTh />
                                <Link href="/admin">Dashboard</Link>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaChartBar />
                                <Link href="/admin/Analysis">Analysis</Link>
                            </li>
                        </ul>
                    </div>

                    {/* E-commerce Section */}
                    <div>
                        <h2 className="text-gray-600 uppercase text-sm font-semibold mb-3">Ecommerce</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaTags />
                                <Link href="/admin/category">Categories</Link>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaBox />
                                <Link href="/admin/product">Product</Link>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaPalette />
                                <Link href="/admin/color">Color</Link>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaRuler />
                                <Link href="/admin/accessories">Accessories</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Order Management Section */}
                    <div>
                        <h2 className="text-gray-600 uppercase text-sm font-semibold mb-3">Order Management</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaClipboardList />
                                <Link href="/admin/order">Orders</Link>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaMoneyBill />
                                <Link href="/admin/transaction">Transactions</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Users Section */}
                    <div>
                        <h2 className="text-gray-600 uppercase text-sm font-semibold mb-3">Users</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaUsers />
                                <Link href="/admin/user">Users</Link>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black">
                                <FaUserShield />
                                <Link href="/admin/admin-user">Admin Users</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
        </>
    )
}
