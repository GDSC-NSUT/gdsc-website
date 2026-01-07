"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';           
import NavbarLight from './NavbarLight'; 

const NavbarManager = () => {
  const pathname = usePathname();
  if (pathname === '/') {
    return <Navbar />;
  } else {
    return <NavbarLight />;
  }
};

export default NavbarManager;