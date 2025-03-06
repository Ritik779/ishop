import React from 'react';
import ProductCard from '@/components/website/ProductCard';
import { ColorData, ProductData } from '@/library/api-calls';
import ItemsHeader from '@/components/website/ItemsHeader';
import Pagination from '@/components/website/Pagination';
import Image from 'next/image';
import storeBanner from '@/assest/images/Store_Banner.png';

export default async function Store({ searchParams }) {

    let range = null;
    if (searchParams.min != null && searchParams.max != null) {
        range = {
            min: Number(searchParams.min),
            max: Number(searchParams.max)
        }
    }
    let color = searchParams.color ?? null;
    let Page = searchParams.page ?? null;
    let Limit = searchParams.limit ?? 9;
    let sortByName = searchParams.sort_by_name ?? null;
    let Search = searchParams.search ?? null;
    let viewMode = searchParams.view ?? "grid"; // Default to grid view

    const products = await ProductData(null, range, color, Page, Limit, sortByName, Search);
    const colors = await ColorData();

    return (
        <>
            <main className="col-span-3">
                <section className='grid grid-cols-3 gap-3'>
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
                </section>
                <section className="mt-4">
                    <ItemsHeader pro_length={products.length} colors={colors} products={products} />
                    <div className={`${viewMode === "grid" ? "grid grid-cols-3 gap-3" : "flex flex-col gap-3"} mt-2`}>
                        {
                            products?.length > 0
                                ? products?.map((prod) => (
                                    <ProductCard key={prod._id} {...prod} viewMode={viewMode} />
                                ))
                                : <span className="text-4xl text-gray-500 col-span-3 text-center mt-4">No Products</span>
                        }
                    </div>
                </section>
                <section>
                    <Pagination response={products} />
                </section>
            </main>
        </>
    );
}