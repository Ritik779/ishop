"use client"

import PageHeader from '@/components/admin/PageHeader'
import { GetColorByID } from '@/library/api-calls'
import { axiosInstance, titleToSlug } from '@/library/helper'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function EditColor() {
  const name = useRef(null)
  const slug = useRef(null)
  const color_code = useRef(null)
  const Hex_code = useRef(null)
  const [nameError, setNameError] = useState(false)
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [color, setColor] = useState({});

  const FetchColorData = async () => {
    const data = await GetColorByID(id)
    setColor(data)
  }

  useEffect(
    () => {
      FetchColorData()
    }, [id]
  )

  const NameChangeHandler = () => {
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
    Hex_code.current.value = color_code.current.value,
      slug.current.value = titleToSlug(name.current.value)
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    const data = {
      name: name.current.value.trim().toUpperCase(),
      slug: slug.current.value,
      color_code: color_code.current.value
    }
    axiosInstance.put(`/color/update/${id}`, data)
      .then(
        (res) => {
          if (res.data.flag == 1) {
            router.push("/admin/color")
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
      <PageHeader breadcurms={["Dashboard", "color", "Edit"]} name={"Edit Color"} button={{ text: "Back To View", url: "/admin/color" }} />
      <div className="p-5 bg-white shadow-lg rounded-ee-lg">
        <form onSubmit={SubmitHandler} className='w-full'>
          <div className='grid grid-cols-7 gap-4'>
            <div className="mb-2 col-span-2">
              <label htmlFor="name" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Color Name</label>
              <input
                onChange={NameChangeHandler}
                ref={name}
                defaultValue={color.name}
                type="text"
                name='name'
                id='name'
                placeholder='Enter Category Name'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
              <span className={`${nameError == true ? "text-red-600" : "text-transparent"}`}>
                Color Already Exists
              </span>
            </div>
            <div className="mb-2 col-span-2">
              <label htmlFor="slug" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Color Name</label>
              <input
                onChange={NameChangeHandler}
                ref={slug}
                defaultValue={color.slug}
                type="text"
                name='slug'
                id='slug'
                placeholder='Enter Category slug'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2 col-span-1">
              <label htmlFor="color_code" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>color_code</label>
              <input
                onChange={NameChangeHandler}
                type="color"
                name='color_code'
                ref={color_code}
                defaultValue={color.color_code}
                id='color_code'
                placeholder='Enter color_code'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2 col-span-2">
              <label htmlFor="hex_code" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>hex_code</label>
              <input
                type="text"
                name='hex_code'
                ref={Hex_code}
                defaultValue={color.color_code}
                id='color_code'
                placeholder='Enter hex_code'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button disabled={nameError} type='submit' className='p-2 bg-blue-500 rounded text-white focus:shadow-outline focus:outline-none disabled:opacity-[0.3]'>
              Update Color
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
