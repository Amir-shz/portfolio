"use client";

import Logo from "../ui/Logo";
// import NameLink from "../ui/NameLink";
import NavList from "../ui/NavList";
import MobileMenu from "./MobileMenu";

// import { motion } from "motion/react";

function Header(): React.ReactNode {
  return (
    // <motion.header
    //   initial={{ y: "-100%" }}
    //   animate={{ y: "0" }}
    //   transition={{ duration: 0.5 }}
    //   className="flex justify-between items-center py-4"
    // >
    <header className="flex justify-between items-center py-4 max-sm:py-3">
      {/* <NameLink /> */}
      {/* for same size in left and right */}
      <Logo />
      <NavList />
      <div className=" invisible">
        <Logo />
      </div>
      <MobileMenu />
      {/* </motion.header> */}
    </header>
  );
}

export default Header;
