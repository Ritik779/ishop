import Image from "next/image";
import React from "react";
import ishop from "@/assest/images/ishop.png"
import facebook from "@/assest/images/facebook.png";
import twitter from "@/assest/images/twitter.png";
import visa from "@/assest/images/visa.png";
import Paypal from "@/assest/images/Paypal.png";
import master_card from "@/assest/images/master_card.png";
import Western_union from "@/assest/images/Western_union.png";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="w-full border-y">
        <div className="max-w-[1100px] mx-auto pt-16 pb-8">
          <div className="grid grid-cols-3 gap-16 text-[12px]">
            <div className="flex flex-col gap-5">
              <Image src={ishop} alt="ishop" />
              <span>
                Your one-stop destination for the latest electronic gadgets and accessories. Explore top-quality products, unbeatable prices, and seamless shopping experiences. Shop smart, shop with us!
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[18px] font-bold text-[#22262A]">
                Follow us
              </span>
              <span>
                Stay connected with us! Follow us on Facebook and Twitter for the latest updates, exclusive deals, and more.png
              </span>
              <div className="flex gap-8 items-center">
                <Link href={"#"}>
                  <Image src={facebook} alt="facebook" />
                </Link>
                <Link href={"#"}>
                  <Image src={twitter} alt="twitter" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-[18px] font-bold text-[#22262A]">
                Contact us
              </span>
              <div>
                iShop: address @building 124 <br />
                Call us now: 6350587050 <br />
                Email: Shardaritik17@gmail.com
              </div>
            </div>
          </div>
          <div className="w-full my-10 bg-[#e6e6e6] h-[2px]"></div>
          <div className="flex justify-between">
            <div>
              <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Information</h2>
              <ul className="text-[14px]">
                <li className="my-3">About</li>
                <li className="my-3">Information</li>
                <li className="my-3">Privacy Policy</li>
                <li className="my-3">Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Service</h2>
              <ul className="text-[14px]">
                <li className="my-3">About</li>
                <li className="my-3">Information</li>
                <li className="my-3">Privacy Policy</li>
                <li className="my-3">Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Extras</h2>
              <ul className="text-[14px]">
                <li className="my-3">About</li>
                <li className="my-3">Information</li>
                <li className="my-3">Privacy Policy</li>
                <li className="my-3">Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">My Account</h2>
              <ul className="text-[14px]">
                <li className="my-3">About</li>
                <li className="my-3">Information</li>
                <li className="my-3">Privacy Policy</li>
                <li className="my-3">Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Useful Links</h2>
              <ul className="text-[14px]">
                <li className="my-3">About</li>
                <li className="my-3">Information</li>
                <li className="my-3">Privacy Policy</li>
                <li className="my-3">Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Our Offers</h2>
              <ul className="text-[14px]">
                <li className="my-3">About</li>
                <li className="my-3">Information</li>
                <li className="my-3">Privacy Policy</li>
                <li className="my-3">Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1100px] py-10 mx-auto flex justify-end">
        <div className=" flex gap-6 items-center">
          <Link href={'#'}><Image src={visa} alt="visa" /></Link>
          <Link href={'#'}><Image src={Paypal} alt="Paypal" /></Link>
          <Link href={'#'}><Image src={master_card} alt="master_card" /></Link>
          <Link href={'#'}><Image src={Western_union} alt="Western_union" /></Link>
        </div>

      </div>
    </div>
  );
};

export default Footer;
