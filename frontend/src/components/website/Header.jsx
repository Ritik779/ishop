"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import iShopLogo from "@/assest/images/iSHOP_Logo.png";
import SearchIcon from "@/assest/images/search_icon.png";
import BagIcon from "@/assest/images/bag_icon.png";
import ProfileIcon from "@/assest/images/profile_icon.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { logout, lstouser } from "@/redux/slices/UserSlice";
import { emptyCart, lsToCart } from "@/redux/slices/CartSlice";


const Header = () => {
    const user = useSelector(store => store.user)
    const cart = useSelector(store => store.cart)
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(lstouser(localStorage.getItem("user")))
            dispatch(lsToCart())
        }, []
    )

    

    return (
        <div className="w-full bg-white z-[50] shadow-sm mb-3">
            <div className="w-full bg-white shadow]">
                <div className="max-w-[1250px] mx-auto py-4 text-[14px] flex justify-between items-center sticky top-0 ">
                    <div className="flex gap-3">
                        <select
                            name="language"
                            className="font-bold text-[14px] outline-none"
                        >
                            <option value="en">EN</option>
                            <option value="hi">Hi</option>
                        </select>
                        <select
                            name="currency"
                            className="font-bold text-[14px] outline-none"
                        >
                            <option value="$">$</option>
                            <option value="₹">₹</option>
                        </select>
                        <Link href={user.data != null ? "/profile" : "/website/login"} className="flex gap-2 items-center cursor-pointer font-bold">
                            <Image src={ProfileIcon} alt="ProfileIcon" />
                            <span>
                                {
                                    user.data != null && "Hii" + user.data.name ? user.data.name : "User"
                                }
                            </span>
                        </Link>
                    </div>
                    <div className="flex gap-10 items-center text-[14px] font-bold">
                        <Link href={user.data != null ? "/cart" : "/website/login"} className="flex gap-2 items-center cursor-pointer">
                            <Image src={BagIcon} alt="BagIcon" /> <span>{cart.item.length} items</span>{" "}
                            <span className="text-[#929292] flex">₹ {cart.final_total}</span>
                        </Link>
                        <div className="cursor-pointer">
                            <Image src={SearchIcon} alt="SearchIcon" />
                        </div>
                        <div className="flex gap-2 items-center cursor-pointer">
                            {
                                user.data != null
                                    ?
                                    <button onClick={() =>{
                                        dispatch(logout());
                                        dispatch(emptyCart())
                                    }
                                    } className="flex items-center gap-2"><RiLogoutBoxLine />  Logout</button>
                                    :
                                    <Link href={"/website/login"} className="flex items-center gap-2">
                                        <FaUserCircle className="text-xl" />
                                        Login
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="max-w-[1100px] mx-auto flex flex-col items-center mt-12 sticky top-0">
                    <div>
                        <Image src={iShopLogo} alt="iShopLogo" />
                    </div>
                    <div className="w-full  mt-4 relative">
                        <ul className="max-w-[70%] mx-auto flex justify-evenly items-center p-3 text-[14px] font-bold ">
                            <Link href={"/"}>
                                <li className="hover:text-[#2E90E5] cursor-pointer ">HOME</li>
                            </Link>
                            <Link href={'/store'}>
                                <li className="hover:text-[#2E90E5] cursor-pointer  group ">
                                    STORE
                                    <div className="w-full cursor-default max-h-[325px] absolute top-100 left-0 border p-8 invisible transition-opacity duration-500 opacity-0 group-hover:opacity-100 group-hover:visible flex justify-between bg-white z-50">
                                        <div>
                                            <h2 className="mb-4 text-[18px] text-[#C1C8CE] ">
                                                Accessories
                                            </h2>
                                            <ul className="flex h-full text-[14px] flex-col items-start gap-5 gap-x-10 flex-wrap text-[#262626] font-thin  ">
                                                <Link href={'#'}><li>Airport & Wireless</li></Link>
                                                <li>AppleCare</li>
                                                <li>Bags,Shells & Sleeves</li>
                                                <li>Business & Security</li>
                                                <li>Cable & Docks</li>
                                                <li>Cameras & Videos</li>
                                                <li>Car & Travels</li>
                                                <li>Cases & Films</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h2 className="mb-4 text-[18px] text-[#C1C8CE] ">
                                                Category
                                            </h2>
                                            <ul className="flex h-full text-[14px] flex-col items-start gap-5 gap-x-10 flex-wrap text-[#262626] font-thin  ">
                                                <li>Charging Devices</li>
                                                <li>Connexted Home</li>
                                                <li>Device Care</li>
                                                <li>Display & Graphic</li>
                                                <li>Fitness & Sport</li>
                                                <li>Headphones</li>
                                                <li>HealthKit</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h2 className="mb-4 text-[18px] text-[#C1C8CE] ">
                                                Category
                                            </h2>
                                            <ul className="flex h-full text-[14px] flex-col items-start gap-5 gap-x-10 flex-wrap text-[#262626] font-thin  ">
                                                <li>Airport & Wireless</li>
                                                <li>AppleCare</li>
                                                <li>Bags,Shells & Sleeves</li>
                                                <li>Business & Security</li>
                                                <li>Cable & Docks</li>
                                            </ul>
                                        </div>
                                    </div>
                                </li></Link>
                            <li className="hover:text-[#2E90E5] cursor-pointer">IPHONE</li>
                            <li className="hover:text-[#2E90E5] cursor-pointer">IPAD</li>
                            <li className="hover:text-[#2E90E5] cursor-pointer">Accessories</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
