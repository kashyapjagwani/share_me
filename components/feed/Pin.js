import React, { useState } from "react";
import { MdDownloadForOffline, MdLocationOn } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Pin(props) {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const router = useRouter();
  const { _id, image, destination } = props.pin;
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => router.push(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && (
          <Image
            className="rounded-lg w-full"
            width={200}
            height={100}
            // style={{ minWidth: "400px" }}
            src={image}
            alt="user-post"
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  // savePin(_id);
                }}
                type="button"
                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
              >
                Save
              </button> */}
            </div>
            <div className="flex items-center gap-2 bg-white text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md">
              <div>
                <MdLocationOn />
              </div>
              <div
                className="whitespace-nowrap w-fit text-ellipsis overflow-hidden"
                style={{
                  maxWidth: "100%",
                }}
              >
                {destination}
              </div>
              {/* {postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
