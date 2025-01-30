import DeleteBtn from '@/components/admin/DeleteBtn'
import PageHeader from '@/components/admin/PageHeader'
import Restore from '@/components/admin/Restore'
import { AccessoryTrash } from '@/library/api-calls'
import { timeAgo } from '@/library/helper'
import React from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6'

export default async function TrashAccessory() {

    const Accessories = await AccessoryTrash();

    return (
        <main className='col-span-4 rounded-md bg-white p-6'>
            <PageHeader breadcurms={["Dashboard", "Accessories", "trash"]} button={{ text: "Back To View", name: "Trash-Bin", url: "/admin/accessories" }} />
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-left">
                    <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sn
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name/Slug
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thumbnail
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock / Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TimeStamps
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Accessories.map(
                                (accessory, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                                            >
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4 text-black font-bold">
                                                <span className='block'>Name : {accessory.name}</span>
                                                <span className='block'>Slug : {accessory.slug}</span>
                                            </td>
                                            <td className="px-4 py-4 flex flex-col items-center gap-1">
                                                <span className='line-through p-2 border border-black rounded text-black flex items-center'>
                                                    <FaIndianRupeeSign /> {accessory.orignal_price}
                                                </span>
                                                <span className='p-2 border border-black rounded text-blue-700 flex items-center'>
                                                    <FaIndianRupeeSign /> {accessory.discount_price}
                                                </span>
                                                <span className='p-2 border border-black rounded text-black'>
                                                    <span className='font-bold'>
                                                        {accessory.discount_percentage}
                                                    </span>
                                                    <span className='text-red-600 font-bold '>OFF</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <img src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/accessory/${accessory.image}`} alt="" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='text-black font-semibold'>
                                                    Products : {accessory.product.map(
                                                        (products, index) => {
                                                            return <div key={index} className='flex gap-2 py-1'>
                                                                {products.name}
                                                            </div>
                                                        }
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 flex flex-col gap-4">
                                                <span className='block'>
                                                    {
                                                        accessory.stock == true
                                                            ?
                                                            <span className='bg-green-200 rounded p-2 px-3 text-black'>In_Stock</span>
                                                            :
                                                            <span className='bg-red-200 rounded p-2 px-3 text-black'>In_Stock</span>
                                                    }
                                                </span>
                                                <span className='block'>
                                                    {
                                                        accessory.status == true
                                                            ?
                                                            <span className='bg-green-200 rounded p-2 px-3 text-black'>Active</span>
                                                            :
                                                            <span className='bg-red-200 rounded p-2 px-3 text-black'>Inactive</span>
                                                    }
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 text-black font-semibold'>
                                                <span className='block'>
                                                    DeletedAt :{timeAgo(accessory.deletedAt)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-4 items-center text-lg">
                                                    <Restore endPoint={`/accessories/restore/${accessory._id}`} />
                                                    <DeleteBtn endPoint={`/accessories/delete/${accessory._id}`} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>

        </main >
    )
}

