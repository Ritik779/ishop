import React from 'react';
import Image from "next/image";
import storeBanner from "@/assest/images/Store_banner.png"
import ProductCard from '@/components/website/ProductCard';
import { ProductData } from '@/library/api-calls';
import ItemsHeader from '@/components/website/ItemsHeader';


export default async function CategoryProduct({ params, searchParams }) {
    
    let range = null;
    if (searchParams.min != null && searchParams.max != null) {
        range = {
            min: Number(searchParams.min),
            max: Number(searchParams.max)
        }
    }
    let color = null;
    if (searchParams.color != null) {
        color = searchParams.color
    }
    let category = params.category_slug
    const products = await ProductData(category, range, color)

    return (
        <>
            <div className="col-span-3">
                <div className='grid grid-cols-3 gap-3'>
                    <div className=" bg-[#2e90e5] col-span-3 rounded-[4px] flex justify-evenly items-center gap-4">
                        <div className='w-[30%] text-white'>
                            <h1 className='text-[42px]'>
                                iPhone 8
                            </h1>
                            <p className='text-[16px]'>Performance and design. Taken right to the edge.</p>
                            <button className='border-b-[5px] border-white text-[14px] text-bold mt-10'>SHOP NOW</button>
                        </div>
                        <div className='w-[30%]'>
                            <Image src={storeBanner} className='h-[380px]' alt='Banner Image' />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-3 mt-4'>
                    <ItemsHeader pro_length={products.length} />
                    {
                        products.length > 0
                            ?
                            products.map(
                                (prod) => {
                                    return <ProductCard key={prod._id} {...prod} />
                                }
                            )
                            :
                            <span className='text-4xl text-gray-500 col-span-3 text-center mt-4'>Category Have No Product</span>
                    }
                </div>
            </div>
        </>
    );
}
