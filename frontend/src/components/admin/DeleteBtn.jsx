"use client"

import { axiosInstance } from '@/library/helper'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function DeleteBtn({endPoint}) {
    const router = useRouter()
    const DeleteHandler = () =>{
        axiosInstance.delete(endPoint)
        .then(
            (response)=>{
                if(response.data.flag == 1){
                    router.refresh()
                    toast.success(response.data.message)
                }else{
                    toast.error(response.data.message)
                }
            }
        ).catch(
            ()=>{
                toast.error(response.data.message)
            }
        )
    }


    return (
        <>
            <FaTrashAlt className='cursor-pointer' onClick={DeleteHandler}/>
        </>
    )
}
