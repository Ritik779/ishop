"use client"

import PageHeader from '@/components/admin/PageHeader'
import { axiosInstance, titleToSlug } from '@/library/helper'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import Images from '@/components/admin/Images'
import { useRouter } from 'next/navigation'
import { ProductData } from '@/library/api-calls';

export default function AddAccessories() {
  const [image, setImage] = useState(null)
  const name = useRef(null)
  const slug = useRef(null)
  const orignal_price = useRef(null)
  const discount_price = useRef(null)
  const discount_percentage = useRef(null)
  const [nameError, setNameError] = useState(false)
  const [product, setProduct] = useState([])
  const [newProduct, setNewProduct] = useState()
  const router = useRouter()


  const MultiProductData = (options) => {
    const ids = options.map(opt => opt.value);
    setNewProduct(ids)
  }

  // console.log(JSON.stringify(newProduct))

  const PriceChangeHandler = () => {
    const price = orignal_price.current.value
    const discount = discount_price.current.value
    if (price != 0 && discount != 0 && price >= discount) {
      const final = ((price - discount) * 100) / price
      discount_percentage.current.value = Math.round(final) + "%"
    }
  }

  const getData = async () => {
    const getProduct = await ProductData()
    setProduct(getProduct)
  }


  useEffect(
    () => {
      getData()
    }, []
  )


  const NameChangeHandler = () => {
    slug.current.value = titleToSlug(name.current.value)
  }

  const SubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("name", e.target.name.value)
    formData.append("slug", e.target.slug.value)
    formData.append("product", JSON.stringify(newProduct))
    formData.append("orignal_price", e.target.orignal_price.value)
    formData.append("discount_price", e.target.discount_price.value)
    formData.append("discount_percentage", e.target.discount_percentage.value)
    formData.append("image", image)


    axiosInstance.post("/accessories/create", formData)
      .then(
        (response) => {
          if (response.data.flag == 1) {
            e.target.reset()
            toast.success(response.data.message)
            router.push("/admin/accessories")
          } else {
            toast.error(response.data.message)
          }
        }
      ).catch(
        (error) => {
          toast.error(response.data.message)
        }
      )
  }


  return (
    <main className='min-h-screen col-span-4 rounded-md bg-white p-6'>
      <PageHeader breadcurms={["Dashboard", "Accessories", "Add"]} button={{ text: "Back To View", name: "Add New Accessories", url: "/admin/accessories" }} />
      <div className="p-5 bg-white shadow-lg rounded-ee-lg">
        <form onSubmit={SubmitHandler} className='w-full'>
          <div className='grid grid-cols-2 gap-4'>
            <div className="mb-2">
              <label htmlFor="name" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Accessory Name</label>
              <input
                onChange={NameChangeHandler}
                ref={name}
                type="text"
                name='name'
                id='name'
                placeholder='Enter Accessories Name'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2">
              <label htmlFor="slug" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Accessory Slug</label>
              <input
                type="text"
                name='slug'
                ref={slug}
                readOnly={true}
                id='slug'
                placeholder='Enter Accessories Slug'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className="mb-2">
              <label htmlFor="product" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Select Product</label>
              <Select onChange={options => MultiProductData(options)} name='Product' closeMenuOnSelect={false} isMulti
                options={product.map(item => {
                  return {
                    value: item._id,
                    label: item.name
                  }
                }
                )}
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className="mb-2">
              <label htmlFor="orignal_price" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Orignal Price</label>
              <input
                onChange={PriceChangeHandler}
                ref={orignal_price}
                type="number"
                name='orignal_price'
                id='orignal_price'
                placeholder='Enter Accessories orignal_price'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2">
              <label htmlFor="discount_price" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Discount Price</label>
              <input
                onChange={PriceChangeHandler}
                type="number"
                name='discount_price'
                ref={discount_price}
                id='discount_price'
                placeholder='Enter Accessories discount_price'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2">
              <label htmlFor="discount_percentage" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Discount Percentage</label>
              <input
                type="text"
                readOnly={true}
                name='discount_percentage'
                ref={discount_percentage}
                id='discount_percentage'
                defaultValue={0}
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='mb-2'>
              <label htmlFor="image" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Upload Image</label>
              <Images name="image" onImageSelect={(img) => setImage(img)} isMulti={false} />
            </div>
          </div>
          <div className="flex justify-end">
            <button disabled={nameError} type='submit' className='p-2 bg-blue-500 rounded text-white focus:shadow-outline focus:outline-none disabled:opacity-[0.3]'>
              ADD Accessories
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
