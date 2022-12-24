import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import Spinner from "../main/Spinner";
import { getPins } from "../../firebase/utils";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

const Feed = ({ category }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(true);

  const fetchPins = async () => {
    const pins = await getPins(category);
    setPins(pins);
    setTimeout(() => setLoading(false), 500);
  };
  useEffect(() => {
    fetchPins();
  }, [category]);

  const ideaName = category || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  if (!pins.length) {
    return (
      <div className="flex flex-col items-center">
        No pins have been posted in this category yet. Create one now!
        <Link
          href="/create-pin"
          className="mt-3 bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
      </div>
    );
  }
  return <div>{!!pins.length && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
