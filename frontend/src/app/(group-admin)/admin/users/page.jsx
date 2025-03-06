import DeleteBtn from '@/components/admin/DeleteBtn';
import PageHeader from '@/components/admin/PageHeader';
import ToggleStatus from '@/components/admin/ToggleStatus';
import { getUserData } from '@/library/api-calls';
import { timeAgo } from '@/library/helper';
import Link from 'next/link';
import React from 'react'
import { FaPenAlt } from 'react-icons/fa'

export default async function Users() {

  const Users = await getUserData();

  return (
    <main className='col-span-4 rounded-md bg-white p-6'>
      <PageHeader breadcurms={["Dashboard", "Users"]} name={"Users"} trash={{ link: "/admin/users/trash" }} />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-left">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                User Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
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
              Users.map((user, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4">
                    <ToggleStatus
                      Yes="Active"
                      No="Inactive"
                      currentStatus={user.status}
                      field="status"
                      endPoint={`/category/change-status/${user._id}`}
                    />
                  </td>
                  <td className='px-6 py-4'>
                    {timeAgo(user.createdAt)}
                  </td>
                  <td className='px-6 py-4'>
                    {timeAgo(user.updatedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4 items-center text-lg cursor-pointer">
                      <Link href={`http://localhost:3000/admin/category/edit/${user._id}`}>
                        <FaPenAlt />
                      </Link>
                      <DeleteBtn endPoint={`/category/trash/${user._id}`} />
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
