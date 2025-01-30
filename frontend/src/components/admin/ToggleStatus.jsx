"use client";

import { axiosInstance } from '@/library/helper';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function ToggleStatus({ currentStatus, field, endPoint, Yes, No }) {
    const [status, setStatus] = useState(currentStatus);
    const router = useRouter();

    const toggleHandler = () => {
        const updatedField = { [field]: !status };

        axiosInstance.patch(endPoint, updatedField)
            .then((response) => {
                if (response.data.flag === 1) {
                    setStatus(!status);
                    router.refresh();
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(() => {
                toast.error("Internal Server Error");
            });
    };

    return (
        <div onClick={toggleHandler} className="cursor-pointer">
            {status
                ? <span className="bg-green-200 rounded p-2 px-3 text-black">{Yes}</span>
                : <span className="bg-red-200 rounded p-2 px-3 text-black">{No}</span>}
        </div>
    );
}
