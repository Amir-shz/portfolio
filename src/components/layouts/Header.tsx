"use client";

import Logo from "../ui/Logo";
import NameLink from "../ui/NameLink";
import NavList from "../ui/NavList";

import { motion } from "motion/react";

function Header(): React.ReactNode {
  return (
    <motion.header
      initial={{ y: "-100%" }}
      animate={{ y: "0" }}
      transition={{ duration: 0.25 }}
      className="flex justify-between items-center py-4"
    >
      <NameLink />
      <NavList />
      <Logo />
    </motion.header>
  );
}

export default Header;
