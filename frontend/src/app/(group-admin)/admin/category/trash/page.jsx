import DeleteBtn from '@/components/admin/DeleteBtn'
import PageHeader from '@/components/admin/PageHeader'
import Restore from '@/components/admin/Restore'
import { CategoryTrash } from '@/library/api-calls'
import { timeAgo } from '@/library/helper'
import React from 'react'

export default async function Trash() {

    const categories = await CategoryTrash();
    
    return (
        <main className='col-span-4 rounded-md bg-white p-6'>
            <PageHeader breadcurms={["Dashboard", "Categories", "trash"]} button={{ text: "Back To View", name: "Trash-Bin", url: "/admin/category" }} />
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-left">
                    <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category Slug
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trash-At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {category.slug}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`p-2 rounded text-black ${category.status ? "bg-green-200" : "bg-red-200"}`}>
                                            {category.status ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        {timeAgo(category.deletedAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4 items-center text-lg cursor-pointer">
                                            <Restore endPoint={`/category/restore/${category._id}`} />
                                            <DeleteBtn endPoint={`/category/delete/${category._id}`} />
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
