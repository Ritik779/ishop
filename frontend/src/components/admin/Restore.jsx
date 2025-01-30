"use client"

import { axiosInstance } from '@/library/helper'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
import { MdRestore } from "react-icons/md";


export default function Restore({ endPoint }) {
    const router = useRouter()

    const DataRestore = () => {
        axiosInstance.patch(endPoint)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        router.refresh()
                        toast.success(response.data.message)
                    } else {
                        toast.error(response.data.message)
                    }
                }
            ).catch(
                (err) => {
                    toast.error(response.data.message)
                }
            )
    }

    return (
        <>
            <MdRestore className='cursor-pointer text-2xl' onClick={DataRestore} />
        </>
    )
}
