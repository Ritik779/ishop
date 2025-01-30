import Link from 'next/link'
import React from 'react'
import { FaAngleRight, FaHome } from 'react-icons/fa'

export default function PageHeader({ breadcurms, button, trash }) {
    return (
        <>
            <div className='inline-flex gap-2 mb-4 items-center'>
                <FaHome />
                {
                    breadcurms.map(
                        (curm, index) => {
                            return (
                                <div key={index} className='flex items-center'>
                                    <FaAngleRight style={{ display: index == 0 && "none" }} />
                                    <div className={`${index == breadcurms.length - 1 && "text-blue-500"} flex items-center gap-2`}>
                                        {curm}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>

            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-semibold'>
                    {button.name}
                </h1>
                <div className='flex justify-end gap-2'>
                    {
                        trash?.link != undefined
                        &&
                        <Link href={trash.link}>
                            <button className='p-2 bg-blue-500 rounded text-white'>Trash-Bin</button>
                        </Link>
                    }
                    <Link href={`${button.url}`}>
                        <button className='p-2 bg-blue-500 rounded text-white'>{button.text}</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
