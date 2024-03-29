import React from "react";
import { RiHomeFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../public/logo.png";
import Image from "next/image";
import { categories } from "../../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

export default function Sidebar({ closeToggle }) {
  const router = useRouter();
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          href="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <Image src={logo} alt="logo" className="" width={40} />
          <div className="text-xl font-mono font-thin tracking-tight">
            Share Me
          </div>
        </Link>
        <div className="flex flex-col gap-5">
          <Link
            href="/"
            className={
              router.pathname == "/" ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </Link>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover cateogries
          </h3>
          {categories.map((category) => (
            <Link
              href={`/category/${category.name}`}
              className={
                router.asPath === `/category/${category.name}`
                  ? isActiveStyle
                  : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      {/* {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )} */}
    </div>
  );
}
