import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from "react-icons/fa";
import { PiDotsThreeCircle } from "react-icons/pi";
import CartBtn from "./CartBtn";
import Link from "next/link";

export default function ProductCard({ _id, name, stock, color, orignal_price, discount_price, discount_percentage, main_image, viewMode }) {
    return (
        <>
            <div className={`${viewMode == "list" ? "col-span-3 grid grid-cols-2 gap-2" : "col-span-1"} bg-white rounded-lg border border-black shadow-lg overflow-hidden py-2 px-4`}>
                {/* Product Image */}
                <div className="flex justify-center">
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${main_image}`} // Replace with your product image URL
                        alt={name}
                        className={`${viewMode == "list" ? "h-[230px]" : "h-[170px]"} object-contain`}
                    />
                </div>

                {/* Product Title */}
                <div className="flex flex-col justify-between flex-grow">
                    <h2 className="text-center font-semibold text-lg mt-4">{name}</h2>

                    {/* Pricing */}
                    <div className="mt-4 text-center">
                        <span className=" text-gray-700 font-bold text-xl mr-2">₹ {discount_price}</span>
                        <span className="text-red-500">{discount_percentage} OFF</span>
                        <br />
                        <span className="text-black line-through mx-3">₹ {orignal_price}</span>
                    </div>
                    {/* Rating */}
                    {/** Ratings */}
                    <div className="flex justify-center space-x-1 my-1 text-yellow-400 text-[10px]">
                        <span>⭐</span> <span>⭐</span> <span>⭐</span> <span>⭐</span>
                        <span className="text-gray-400">⭐</span>
                    </div>
                    <div className="flex justify-center items-center gap-3 text-xl p-2">
                        <CartBtn prices={{ discount_price, orignal_price }} product_id={_id} name={name} colors={color} />
                        <div className="px-4 py-2 bg-blue-500 rounded">
                            <FaHeart className="text-white" />
                        </div>
                        <Link href={`/product_listing/${_id}`} className="px-2 py-1 bg-blue-500 rounded">
                            <PiDotsThreeCircle className="text-white text-3xl" />
                        </Link>
                    </div>
                    <span className={`text-end font-semibold ${stock == true ? "text-green-600" : "text-red-600"}`}>
                        {stock == true ? "In_stock" : "Out_of_stock"}
                    </span>
                </div>
            </div>
        </>
    )
}

