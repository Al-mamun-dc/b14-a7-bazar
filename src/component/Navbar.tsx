
import Image from "next/image";


import ClientDate from "./ClientDate";
import Navlink from "./Navlink";
import { Suspense } from "react";


const Navbar =() => {
    
  
  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto h-18 px-5 flex items-center justify-between">

        {/* Left Side - Logo */}
        <div className="flex items-center gap-2.5">

          {/* Logo Box */}
          <div className="w-9 h-9 rounded-[9px] bg-[#079447] flex items-center justify-center">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={18}
              height={18}
              className="object-contain brightness-0 invert"
            />
          </div>

          {/* Logo Text */}
          <div>
            <h1 className="text-[16px] font-bold text-[#222222] leading-none">
              বাজার দর
            </h1>

            <ClientDate/>
          </div>

        </div>

        {/* Right Side - Auth Buttons */}
        <div className="flex items-center gap-1">

          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-[#333333] hover:text-[#079447] transition"
          >
            সাইন ইন
          </button>

          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-[#079447] rounded-md hover:bg-[#067b3b] transition"
          >
            সাইন আপ
          </button>

        </div>
       
        

      </div><Suspense
    fallback={
      <div className="h-9 border-y border-gray-100" />
    }
  >
    <Navlink />
  </Suspense>
    </nav>
  );
};

export default Navbar;