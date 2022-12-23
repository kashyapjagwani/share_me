import React from "react";
import Main from "../components/main/Main";
import Pins from "../components/main/Pins";

export default function Layout({ children }) {
  return (
    <div className="flex bg-gray-50 flex-col md:flex-row h-screen transition-height duration-75 ease-out">
      <Main />
      <div className="pb-2 flex-1 h-screen overflow-y-scroll">
        <Pins />
        <div>{children}</div>
      </div>
    </div>
  );
}
