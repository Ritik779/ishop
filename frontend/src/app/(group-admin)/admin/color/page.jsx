import DeleteBtn from '@/components/admin/DeleteBtn';
import PageHeader from '@/components/admin/PageHeader';
import ToggleStatus from '@/components/admin/ToggleStatus';
import { ColorData } from '@/library/api-calls'
import { timeAgo } from '@/library/helper';
import Link from 'next/link';
import React from 'react'
import { FaPenAlt } from 'react-icons/fa'

export default async function Color() {

  const colors = await ColorData();

  return (
    <main className='col-span-4 rounded-md bg-white p-6'>
      <PageHeader breadcurms={["Dashboard", "Color"]} name={"Color"} button={{ text: "ADD", url: "/admin/color/add" }} trash={{ link: "/admin/color/trash" }} />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-left">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No
              </th>
              <th scope="col" className="px-6 py-3">
                Colors Name
              </th>
              <th scope="col" className="px-6 py-3">
                Colors Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Color Code
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created-at
              </th>
              <th scope="col" className="px-6 py-3">
                Updated-at
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
                    <ToggleStatus
                      Yes="Active"
                      No="Inactive"
                      currentStatus={color.status}
                      field="status"
                      endPoint={`/color/change-status/${color._id}`}
                    />
                  </td>
                  <td className='px-6 py-4'>
                    {timeAgo(color.createdAt)}
                  </td>
                  <td className='px-6 py-4'>
                    {timeAgo(color.updatedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4 items-center text-lg cursor-pointer">
                      <Link href={`http://localhost:3000/admin/color/edit/${color._id}`}>
                        <FaPenAlt />
                      </Link>
                      <DeleteBtn endPoint={`/color/trash/${color._id}`} />
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
