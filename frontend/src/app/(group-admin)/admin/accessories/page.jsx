import DeleteBtn from '@/components/admin/DeleteBtn';
import PageHeader from '@/components/admin/PageHeader';
import ToggleStatus from '@/components/admin/ToggleStatus';
import { AccessoryData } from '@/library/api-calls'
import { timeAgo } from '@/library/helper';
import Link from 'next/link';
import React from 'react'
import { FaPenAlt } from 'react-icons/fa'
import { FaIndianRupeeSign } from 'react-icons/fa6';

export default async function Accessory() {

  const Accessories = await AccessoryData();

  return (
    <main className='col-span-4 rounded-md bg-white p-6'>
      <PageHeader breadcurms={["Dashboard", "Accessories"]} button={{ text: "ADD", name: "Accessories", url: "/admin/accessories/add" }} trash={{ link: "/admin/accessories/trash" }} />
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
                Category/Colors
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
              Accessories.map((Accessory, index) => {
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 text-black font-bold">
                      <span className='block'>Name : {Accessory.name}</span>
                      <span className='block'>Slug : {Accessory.slug}</span>
                    </td>
                    <td className="px-4 py-4 flex flex-col items-center gap-1">
                      <span className='line-through p-2 border border-black rounded text-black flex items-center'>
                        <FaIndianRupeeSign /> {Accessory.orignal_price}
                      </span>
                      <span className='p-2 border border-black rounded text-blue-700 flex items-center'>
                        <FaIndianRupeeSign /> {Accessory.discount_price}
                      </span>
                      <span className='p-2 border border-black rounded text-black'>
                        <span className='font-bold'>
                          {Accessory.discount_percentage}
                        </span>
                        <span className='text-red-600 font-bold '>OFF</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <img src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/accessory/${Accessory.image}`} alt="" />
                    </td>
                    <td className="px-6 py-4">
                      <div className='text-black font-semibold'>
                        Product : {Accessory.product.map(
                          (products, index) => {
                            return <div key={index} className='flex gap-2 py-1'>
                              {products.name}
                            </div>
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 flex flex-col gap-4">
                      <ToggleStatus
                        Yes="In_Stock"
                        No="Out_Stock"
                        currentStatus={Accessory.stock}
                        field="stock"
                        endPoint={`/accessories/change-status/${Accessory._id}`}
                      />
                      <ToggleStatus
                        Yes="Active"
                        No="Inactive"
                        currentStatus={Accessory.status}
                        field="status"
                        endPoint={`/accessories/change-status/${Accessory._id}`}
                      />
                    </td>
                    <td className='px-6 py-4 text-black font-semibold'>
                      <span className='block'>
                        CreatedAT :{timeAgo(Accessory.createdAt)}
                      </span>
                      <span className='block'>
                        UpdatedAT :{timeAgo(Accessory.updatedAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center text-lg">
                        <Link className='cursor-pointer' href={`${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/accessories/edit/${Accessory._id}`}>
                          <FaPenAlt />
                        </Link>
                        <DeleteBtn className="cursor-pointer" endPoint={`/accessories/trash/${Accessory._id}`} />
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

    </main >
  )
}
