import DeleteBtn from '@/components/admin/DeleteBtn';
import PageHeader from '@/components/admin/PageHeader';
import Restore from '@/components/admin/Restore';
import ToggleStatus from '@/components/admin/ToggleStatus';
import { AdminTrash } from '@/library/api-calls';
import { timeAgo } from '@/library/helper';
import Link from 'next/link';
import React from 'react'
import { FaPenAlt, FaTrashRestore } from 'react-icons/fa'

export default async function Admins() {

    const admins = await AdminTrash();

    return (
        <main className='col-span-4 rounded-md bg-white p-6'>
            <PageHeader breadcurms={["Dashboard", "Admin", "Admin-Trash"]} name={"Admin Trash"} button={{ text: "Back To View", url: "/admin/admins" }} />
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-left">
                    <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contact
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DeletedAt
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map((admin, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {admin.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {admin.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {admin.contact}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            admin.type == 1 && "Super Admin"
                                        }
                                        {
                                            admin.type == 2 && "Sub Admin"
                                        }
                                        {
                                            admin.type == 3 && "Staff"
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        {admin.status == true ? <span className='bg-green-200 p-2 rounded'>Active</span> : <span className='bg-red-200 p-2 rounded'>Inactive</span>}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {timeAgo(admin.deletedAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4 items-center text-lg cursor-pointer">
                                            <Restore endPoint={`/admin/restore/${admin._id}`} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

        </main >
    )
}
