"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`p-4 fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-primary'} md:px-20 md:py-4`}>
      <div className="flex items-center justify-between">
        <div className="">
            <Image
                src="/logo/swiftswap-blue-logo.svg"
                width={150}
                height={150}
                alt="Picture of the author"
            />
        </div>
        <div className="md:hidden ">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke={`${isScrolled ? 'black' : 'white'}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke={`${isScrolled ? 'black' : 'white'}`}  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
        <div className={`hidden ml-auto md:flex md:items-center md:space-x-4  md:gap-5 md:text-sm ${isScrolled ? 'md:text-black' : 'md:text-white'}`}>
          <Link href="/"><span className="hover:text-[#023e8a] hover:font- size-sm">Home</span></Link>
          <Link href="/how-it-works"><span className=" hover:text-[#023e8a] hover:font- size-sm">How It Works</span></Link>
          <Link href="/help"><span className="hover:text-[#023e8a] hover:font- size-sm">Help & FAQ</span></Link>
          <Link href="/track"><span className="hover:text-[#023e8a] hover:font- size-sm">Track Package</span></Link>
        </div>
      </div>
      {isOpen && (
        <div className={` ${isScrolled ? 'bg-white text-black' : 'bg-primary text-white'} py-32 md:hidden`}>
          <div className="flex flex-col items-center mt-4 space-y-16 text-xl font-semibold">
            <Link href="/"><span className=" hover:text-[#023e8a] ">Home</span></Link>
            <Link href="/how-it-works"><span className=" hover:text-[#023e8a]">How It Works</span></Link>
            <Link href="/help"><span className=" hover:text-[#023e8a] ">Help & FAQ</span></Link>
            <Link href="/track"><span className=" hover:text-[#023e8a]">Track Package</span></Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
