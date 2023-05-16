import React, { useEffect } from "react";
import Main from "../components/main/Main";
import Navbar from "../components/main/Navbar";

export default function Layout({
  searchTerm,
  setSearchTerm,
  disableSearch,
  children,
}) {
  useEffect(() => {
    setSearchTerm && setSearchTerm("");
  }, []);

  return (
    <div className="flex bg-gray-50 flex-col md:flex-row h-screen transition-height duration-75 ease-out">
      <Main />
      <div className="pb-2 flex-1 h-screen overflow-y-scroll">
        {!disableSearch && (
          <div className="px-2 md:px-5">
            <div className="bg-gray-50">
              <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
