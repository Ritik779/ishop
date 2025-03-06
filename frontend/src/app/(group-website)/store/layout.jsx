import ColorSelect from '@/components/website/ColorSelect'
import RangeSelect from '@/components/website/RangeSelect'
import { CategoryData, ColorData } from '@/library/api-calls'
import Link from 'next/link'
import React from 'react'
import { FaFilter } from 'react-icons/fa'

export default async function Storelayout({ children }) {

    const getCategory = await CategoryData()
    const Colors = await ColorData()

    return (
        <div className='max-w-[1250px] mx-auto p-2 grid grid-cols-4 gap-4'>
            <div className='col-span-1'>
                {/* Sidebar for Filters */}
                <div className="p-4 rounded-lg shadow-md">
                    <h2 className="bg-gray-100 p-2 rounded-lg flex items-center text-lg font-semibold mb-4">
                        <FaFilter className="mr-2" /> Filters
                    </h2>
                    {/* Category Filter */}
                    <div className="bg-gray-100 p-2 rounded-lg mb-4">
                        <label className="font-semibold text-[18px] p-2 block">Category</label>
                        <div className='p-2'>
                            <Link href={"/store"} className='text-[14px] font-semibold p-2'>ALL</Link>
                            {
                                getCategory.map(
                                    (category, index) => {
                                        return (
                                            <ul key={index} className='first-letter:uppercase flex justify-between items-center p-2 text-[14px] font-semibold break-words'>
                                                <Link href={`/store/${category.slug}`}>
                                                    <li key={index}>{category.name}</li>
                                                </Link>
                                                <span>({category.ProductCount})</span>
                                            </ul>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div>
                    {/* Color Filter */}
                    <ColorSelect colors={Colors ?? []} />
                    {/* Price Range Filter */}
                    <RangeSelect />
                    <div className="text-end">
                        <a href={"/store"} className='bg-red-500 text-white rounded-lg p-2 font-semibold'>Reset</a>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
