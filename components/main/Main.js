import React, { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import Sidebar from "../navigation/Sidebar";
import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

export default function Main() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div>
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar closeToggle={setToggleSidebar} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link href="/">
            <Image src={logo} alt="logo" className="w-28" />
          </Link>
          {/* 
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="user-pic"
              className="w-9 h-9 rounded-full "
            />
          </Link> */}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
    </div>
  );
}
