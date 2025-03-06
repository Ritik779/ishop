"use client";
import { ProductData } from "@/library/api-calls";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const FeaturedProduct = () => {
  const [clickd, setClicked] = useState(0);
  const [products, setProducts] = useState([]);
  const leftTranslateHandler = () => {
    if (clickd == 0) return;
    setClicked(clickd - 1);
  };
  const rightTranslateHandler = () => {
    if (Math.floor(products.length - 3) == clickd) return;
    setClicked(clickd + 1);
  };

  const getData = async () => {
    const response = await ProductData();
    setProducts(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto pb-24 flex flex-col items-center overflow-hidden ">
      <h1 className="text-[26px] sm:text-[30px] font-bold mb-10">
        FEATURED PRODUCTS
      </h1>
      <div className="flex items-center gap-4 ">
        <FaAngleLeft
          onClick={leftTranslateHandler}
          className="text-3xl cursor-pointer z-10 "
        />
        <div className="w-[240px] sm:w-[760px]  flex items-center gap-8  py-4 px-1  overflow-hidden">
          {products.map((product, index) => {
            return (
           <Link key={index} href={`/product-details/${product._id}`}>
              <div
                style={{ transform: `translateX(${-260 * clickd}px)` }}
                className={`flex items-center gap-3 bg-white p-4 rounded-lg shadow-md transition duration-300 ease-linear `}
              >
                {/* Product Image */}
                <div className="w-20 h-20">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${product.main_image}`}
                    alt="Product Main Image"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  <h3 className="w-[100px] whitespace-nowrap overflow-hidden text-ellipsis  text-md font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  {/* Star Rating */}
                  <div className="flex space-x-1 text-yellow-500 text-[10px] my-1">
                    <span>⭐</span> <span>⭐</span> <span>⭐</span>{" "}
                    <span>⭐</span>
                    <span className="text-gray-400">⭐</span>
                  </div>

                  {/* Price */}
                  <div className="text-red-500 text-[12px] text-lg font-bold">
                  ₹{product.discount_price}{" "}
                    <span className="text-gray-400 text-[9px] line-through text-sm">
                    ₹{product.orignal_price}
                    </span>
                  </div>
                </div>
              </div>
           </Link>
            );
          })}
        </div>
        <FaAngleRight
          onClick={rightTranslateHandler}
          className="text-3xl cursor-pointer z-10"
        />
      </div>
    </div>
  );
};

export default FeaturedProduct;
