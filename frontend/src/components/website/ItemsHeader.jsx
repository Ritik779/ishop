"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaBars, FaFilter } from "react-icons/fa";
import ColorSelect from "./ColorSelect";
import RangeSelect from "./RangeSelect";

const ItemsHeader = ({ products, colors }) => {
    const [sortOrder, setSortOrder] = useState("");
    const [productView, setProductView] = useState("grid");
    const [openFilter, setOpenFilter] = useState(false);
    const [limit, setLimit] = useState(9);
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const viewVal = searchParams.get("view");
        if (viewVal) setProductView(viewVal);
    }, [searchParams]);

    useEffect(() => {
        const limitVal = searchParams.get("limit");
        if (limitVal) setLimit(Number(limitVal));
    }, [searchParams]);

    useEffect(() => {
        if (sortOrder) {
            const url = new URL(window.location.href);
            url.searchParams.set("sort_by_name", sortOrder);
            router.push(url.toString());
        }
    }, [sortOrder]);

    const updateSearchParams = (key, value) => {
        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set(key, value);
        } else {
            url.searchParams.delete(key);
        }
        router.push(url.toString());
    };

    return (
        <div className='col-span-3 flex items-center justify-between bg-white shadow-lg rounded-lg p-4'>
            <div className="flex flex-wrap w-full gap-4 items-center justify-between">
                <span className="text-gray-600 text-sm font-medium">{products?.length ?? 0} items</span>
                
                {/* Sorting */}
                <div className="flex items-center gap-2">
                    <label className="text-gray-700 text-sm">Sort By:</label>
                    <select
                        className="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Default</option>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>

                {/* Limit */}
                <div className="flex items-center gap-2">
                    <label className="text-gray-700 text-sm">Show:</label>
                    <select
                        className="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400"
                        value={limit}
                        onChange={(e) => updateSearchParams("limit", e.target.value)}
                    >
                        <option value={9}>9</option>
                        <option value={12}>12</option>
                        <option value={15}>15</option>
                    </select>
                </div>

                {/* Search */}
                <div className="relative w-full max-w-xs">
                    <input
                        type="search"
                        className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        placeholder="Search item..."
                        onKeyUp={(e) => e.key === "Enter" && updateSearchParams("search", e.target.value.trim())}
                        onInput={(e) => updateSearchParams("search", e.target.value.trim())}
                    />
                    <svg className="absolute left-3 top-2 w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="none">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-3">
                    <BsGrid3X3GapFill
                        onClick={() => updateSearchParams("view", "grid")}
                        className={`cursor-pointer text-lg ${productView === "grid" ? "text-blue-600" : "text-gray-400"}`}
                    />
                    <FaBars
                        onClick={() => updateSearchParams("view", "list")}
                        className={`cursor-pointer text-lg ${productView === "list" ? "text-blue-600" : "text-gray-400"}`}
                    />
                </div>

                {/* Filter Toggle */}
                <button onClick={() => setOpenFilter(!openFilter)} className="sm:hidden flex items-center gap-2 text-sm text-blue-600">
                    <FaFilter /> <span>Filter</span>
                </button>
            </div>

            {/* Mobile Filter Section */}
            {openFilter && (
                <div className="absolute left-0 bottom-0 w-full bg-white p-4 shadow-lg transition-all duration-300">
                    <h2 className="text-gray-700 font-medium">Filters</h2>
                    <ColorSelect colors={colors} />
                    <RangeSelect />
                </div>
            )}
        </div>
    );
};

export default ItemsHeader;