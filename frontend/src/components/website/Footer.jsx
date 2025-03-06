import Image from "next/image";
import React from "react";
import ishop from "@/assest/images/ishop.png";
import facebook from "@/assest/images/facebook.png";
import twitter from "@/assest/images/twitter.png";
import visa from "@/assest/images/visa.png";
import Paypal from "@/assest/images/Paypal.png";
import master_card from "@/assest/images/master_card.png";
import Western_union from "@/assest/images/Western_union.png";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full border-t">
      <div className="max-w-[1100px] mx-auto pt-16 pb-8 px-4">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 text-[12px]">
          <div className="flex flex-col gap-5 text-center md:text-left">
            <Image src={ishop} alt="ishop" className="mx-auto md:mx-0" />
            <span>
              Your one-stop destination for the latest electronic gadgets and accessories.
              Explore top-quality products, unbeatable prices, and seamless shopping experiences.
            </span>
          </div>
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="text-[18px] font-bold text-[#22262A]">Follow us</span>
            <span>Stay connected with us! Follow us on social media for updates and deals.</span>
            <div className="flex justify-center md:justify-start gap-6">
              <Link href={"#"}><Image src={facebook} alt="facebook" /></Link>
              <Link href={"#"}><Image src={twitter} alt="twitter" /></Link>
            </div>
          </div>
          <div className="flex flex-col gap-5 text-center md:text-left">
            <span className="text-[18px] font-bold text-[#22262A]">Contact us</span>
            <div>
              iShop: Address @Building 124 <br />
              Call us now: 6350587050 <br />
              Email: Shardaritik17@gmail.com
            </div>
          </div>
        </div>
        <div className="w-full my-10 bg-[#e6e6e6] h-[2px]"></div>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 text-center md:text-left">
          {["Information", "Service", "Extras", "My Account", "Useful Links", "Our Offers"].map((title, index) => (
            <div key={index}>
              <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">{title}</h2>
              <ul className="text-[14px]">
                <li className="my-3">About</li>
                <li className="my-3">Information</li>
                <li className="my-3">Privacy Policy</li>
                <li className="my-3">Terms & Conditions</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-[1100px] py-10 mx-auto flex md:flex-row justify-center md:justify-end gap-6">
        {[visa, Paypal, master_card, Western_union].map((img, index) => (
          <Link key={index} href={'#'}><Image src={img} alt="payment-method" /></Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
