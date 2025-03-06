"use client"

import PageHeader from '@/components/admin/PageHeader'
import { GetCategoryByID } from '@/library/api-calls'
import { axiosInstance, titleToSlug } from '@/library/helper'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function EditCategory() {
  const name = useRef(null)
  const slug = useRef(null)
  const [nameError,setNameError] = useState(false)
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [category,setCategory] = useState({});

  const FetchCategoryData = async () =>{
    const data = await GetCategoryByID(id)
    setCategory(data)
  }

  useEffect(
    ()=>{
      FetchCategoryData()
    },[id]
  )




  const NameChangeHandler = () => {
    axiosInstance.get(`/category/category-exists/${name.current.value}`)
    .then(
      (response)=>{
        if(response.data.flag == 0){
          setNameError(true)
        }else{
          setNameError(false)
        }
      }
    ).catch(
      ()=>{
        toast.error("Internal Server Error")
      }
    )
    slug.current.value = titleToSlug(name.current.value)
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    const data = {
      name: name.current.value,
      slug: slug.current.value
    }
    axiosInstance.put(`/category/update/${id}`, data)
      .then(
        (res) => {
          if (res.data.flag == 1) {
            router.push("/admin/category")
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
      <PageHeader breadcurms={["Dashboard", "Categories", "Edit"]} name={"Edit Category"} button={{ text: "Back To View", url: "/admin/category" }} />
      <div className="p-5 bg-white shadow-lg rounded-ee-lg">
        <form onSubmit={SubmitHandler} className='w-full'>
          <div className='grid grid-cols-2 gap-4'>
            <div className="mb-2">
              <label htmlFor="name" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Category Name</label>
              <input
                onChange={NameChangeHandler}
                ref={name}
                defaultValue={category.name}
                type="text"
                name='name'
                id='name'
                placeholder='Enter Category Name'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
              <span className={`${nameError == true ? "text-red-600" : "text-transparent"}`}>
                Category Already Exists
              </span>
            </div>
            <div className="mb-2">
              <label htmlFor="slug" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Category Slug</label>
              <input
                type="text"
                name='slug'
                ref={slug}
                defaultValue={category.slug}
                readOnly={true}
                id='slug'
                placeholder='Enter Category Slug'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button disabled={nameError} type='submit' className='p-2 bg-blue-500 rounded text-white focus:shadow-outline focus:outline-none disabled:opacity-[0.3]'>
              Update Category
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
