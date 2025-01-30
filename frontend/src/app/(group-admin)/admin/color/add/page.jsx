"use client"

import PageHeader from '@/components/admin/PageHeader'
import { axiosInstance, titleToSlug } from '@/library/helper'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function ADDColor() {
  // console.log(process.env.NEXT_PUBLIC_BASE_URL)
  const name = useRef(null)
  const slug = useRef(null)
  const color_code = useRef(null)
  const Hex_code = useRef(null)
  const [nameError, setNameError] = useState(false)


  const ColorExists = () => {
    axiosInstance.get(`/color/color-exists/${name.current.value}`)
      .then(
        (response) => {
          if (response.data.flag == 1) {
            setNameError(true)
          } else {
            setNameError(false)
          }
        }
      ).catch(
        () => {
          toast.error("Internal Server Error")
        }
      )
    Hex_code.current.value = color_code.current.value
    slug.current.value = titleToSlug(name.current.value)
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    const data = {
      name: name.current.value.trim().toUpperCase(),
      slug: slug.current.value.trim(),
      color_code: color_code.current.value.trim()
    }

    axiosInstance.post(`/color/create`, data)
      .then(
        (res) => {
          if (res.data.flag == 1) {
            e.target.reset();
            toast.success(res.data.message)
          } else {
            toast.error(res.data.message)
          }
        }
      ).catch(
        (err) => {
          toast.error("Internal Server Error")
        }
      )
  }

  return (
    <main className='min-h-screen col-span-4 rounded-md bg-white p-6'>
      <PageHeader breadcurms={["Dashboard", "color", "ADD"]} button={{ text: "Back To View", name: "ADD Color", url: "/admin/color" }} />
      <div className="p-5 bg-white shadow-lg rounded-ee-lg">
        <form onSubmit={SubmitHandler} className='w-full'>

          <div className='grid grid-cols-7 gap-4'>
            <div className="mb-2 col-span-2">
              <label htmlFor="name" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Color Name</label>
              <input
                onChange={ColorExists}
                ref={name}
                type="text"
                name='name'
                id='name'
                placeholder='Enter Color Name'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
              <span className={`${nameError == true ? "text-red-600" : "text-transparent"}`}>
                Color Already Exists
              </span>
            </div>
            <div className='mb-2 col-span-2'>
              <label htmlFor="slug" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Color Slug</label>
              <input
                ref={slug}
                type="text"
                name='slug'
                readOnly={true}
                id='slug'
                placeholder='Color Slug'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2">
              <label htmlFor="color_code" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2 cursor-pointer'>color_code</label>
              <input
                onChange={ColorExists}
                type="color"
                name='color_code'
                ref={color_code}
                id='color_code'
                placeholder='Enter color_code'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2 col-span-2">
              <label htmlFor="Hex_code" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2 cursor-pointer'>Hex_code</label>
              <input
                type="text"
                readOnly={true}
                name='Hex_code'
                ref={Hex_code}
                id='Hex_code'
                placeholder='Enter Hex_code'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button disabled={nameError} type='submit' className='p-2 bg-blue-500 rounded text-white focus:shadow-outline focus:outline-none disabled:opacity-[0.3]'>
              ADD Color
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
