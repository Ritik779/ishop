import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductCard({ name, stock, color, orignal_price, discount_price, discount_percentage, main_image }) {
    return (
        <>

            <div className="col-span-1 bg-white rounded-lg border border-black shadow-lg overflow-hidden p-4">
                {/* Product Image */}
                <div className="flex justify-center">
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${main_image}`} // Replace with your product image URL
                        alt={name}
                        className="h-[170px] object-contain"
                    />
                </div>

                {/* Product Title */}
                <h2 className="text-center font-semibold text-lg mt-4">{name}</h2>

                {/* Rating */}
                <div className="flex justify-center items-center mt-2 text-yellow-500">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                    <FaRegStar />
                </div>

                {/* Pricing */}
                <div className="mt-4 text-center">
                    <span className=" text-gray-700 font-bold text-xl mr-2">₹ {discount_price}</span>
                    <span className="text-red-500">{discount_percentage} OFF</span>
                    <br />
                    <span className="text-black line-through mx-3">₹ {orignal_price}</span>
                </div>
                <span className={`font-semibold ${stock == true ? "text-green-600" : "text-red-600"}`}>
                    {stock == true ? "In_stock" : "Out_of_stock"}
                </span>
                <div className="block">{color.map((col,index) =>
                    <span key={index} className="mr-2" style={{color:col.color_code}}>{col.slug}</span>
                )}
                </div>
            </div>
        </>
    )
}

