import DeleteBtn from '@/components/admin/DeleteBtn'
import PageHeader from '@/components/admin/PageHeader'
import Restore from '@/components/admin/Restore'
import { ColorTrash } from '@/library/api-calls'
import { timeAgo } from '@/library/helper'
import React from 'react'

export default async function Trash() {

    const colors = await ColorTrash();

    return (
        <main className='col-span-4 rounded-md bg-white p-6'>
            <PageHeader breadcurms={["Dashboard", "color", "trash"]} name={"Trash-Bin"} button={{ text: "Back To View", url: "/admin/color" }} />
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-left">
                    <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color Slug
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Deleted-At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            colors.map((color, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4 flex items-center gap-2 font-bold">
                                        <div className="w-[30px] h-[30px] rounded-full" style={{ backgroundColor: color.color_code }}></div>
                                        {color.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {color.slug}
                                    </td>
                                    <td className="px-6 py-4">
                                        {color.color_code}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`p-2 rounded text-black ${color.status ? "bg-green-200" : "bg-red-200"}`}>
                                            {color.status ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        {timeAgo(color.deletedAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4 items-center text-lg cursor-pointer">
                                            <Restore endPoint={`/color/restore/${color._id}`} />
                                            <DeleteBtn endPoint={`/color/delete/${color._id}`} />
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
