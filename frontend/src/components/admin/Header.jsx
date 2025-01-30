import Link from "next/link";
import { FaArrowAltCircleLeft, FaUserCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center postion-sticky top-0 z-10">
      {/* Webpage Name */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-white text-xl"><FaArrowAltCircleLeft /></Link>
        <h1 className="text-xl font-bold text-white">MyShop-Admin Panel</h1>
      </div>

      {/* Admin Info */}
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-3xl text-white" />
        <span className="text-xl font-bold text-white">Ritik Sharda</span>
        <span className="text-white text-xl cursor-pointer">
          <FaAngleDown />
        </span>
      </div>
    </header>
  );
};