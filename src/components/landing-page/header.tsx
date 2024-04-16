"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/AllSpace.svg";
import { Button } from "../ui/button";
import LogoName from "../../../public/Logo Name.svg";

const Header = () => {
  return (
    <header
      className="p-2
      px-6
  flex
  justify-center
  items-center
  border
  "
    >
      <Link
        href={"/"}
        className="w-full
        flex
        gap-0
      justify-left
      items-center"
      >
        <Image src={Logo} alt="AllSpace logo" width={31} height={31} />
        <Image
          src={LogoName}
          alt="AllSpace name"
          width={160}
          height={35}
          className="-ml-[20px]"
        ></Image>
      </Link>
      <aside
        className="flex
      w-full
      gap-2
      justify-end"
      >
        <Link href="/login">
          <Button
            variant="secondary"
            className="font-semibold w-[100px] p-1 hidden sm:block"
          >
            Login
          </Button>
        </Link>
        <Link href={"/signup"}>
          <Button variant="default" className="whitespace-nowrap">
            Sign Up
          </Button>
        </Link>
      </aside>
    </header>
  );
};

export default Header;
