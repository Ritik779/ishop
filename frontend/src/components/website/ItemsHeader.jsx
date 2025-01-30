"use client";
import React, { useState } from 'react'
import { IoGrid } from "react-icons/io5";
import { IoReorderThree } from "react-icons/io5";

export default function ItemsHeader({pro_length}) {
    const [toggle, setToggle] = useState(true);

    const toggleHandler = (value) => {
        setToggle(value);
    }

    return (
        <div className='col-span-3 flex items-center justify-between shadow-md rounded p-4 px-7'>
            <div className='flex gap-5 items-center font-bold'>
                <div>{pro_length} Items</div>
                <div className='flex justify-between items-center gap-2'>
                    <div className='text-[14px]'>Sort By</div>
                    <select className='border border-gray-300 rounded-md p-2'>
                        <option value="">Name</option>
                    </select>
                </div>
                <div className='flex justify-between items-center gap-2'>
                    <div className='text-[14px]'>Show</div>
                    <select className='border border-gray-300 rounded-md p-2'>
                        <option value="">12</option>
                    </select>
                </div>
            </div>
            <div className='flex gap-3 items-center'>
                <IoGrid onClick={()=> toggleHandler(true)} className={`text-xl cursor-pointer ${toggle ? "text-blue-500" : ""}`} />
                <IoReorderThree onClick={()=> toggleHandler(false)} className={`text-3xl cursor-pointer  ${!toggle ? "text-blue-500" : ""}`} />
            </div>
        </div>
    )
}

