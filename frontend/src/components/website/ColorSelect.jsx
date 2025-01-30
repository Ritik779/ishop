"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ColorSelect({ colors }) {
    const router = useRouter();
    const [selectColor, setSelectColor] = useState([]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const colorParams = url.searchParams.get("color");
        if (colorParams) {
            setSelectColor(colorParams.split(','));
        }
    }, []);

    const ColorSelectHandler = (color_slug) => {
        setSelectColor((previousColor) => {
            if (previousColor.includes(color_slug)) {
                return previousColor.filter((color) => color !== color_slug);
            } else {
                return [...previousColor, color_slug];
            }
        });
    };

    useEffect(() => {
        const url = new URL(window.location.href);
        if (selectColor.length !== 0) {
            url.searchParams.set("color", selectColor.join(','));
        } else {
            url.searchParams.delete("color");
        }
        router.push(url.toString());
    }, [selectColor, router]);

    return (
        <div className="mb-4 bg-gray-100 p-2 rounded-lg">
            <label className="font-semibold text-[18px] p-2 block">Colors</label>
            <div className='p-2 flex flex-wrap'>
                {colors?.map((color, index) => (
                    <div key={index} className='p-2 text-[14px] font-semibold'>
                        <button
                            onClick={() => ColorSelectHandler(color.slug)}
                            className={`w-[30px] h-[30px] rounded ${selectColor.includes(color.slug) ? 'border-2 border-black' : 'border-none'}`}
                        >
                            <div className="w-[25px] h-[25px] rounded-full" style={{ backgroundColor: color.color_code }}></div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
