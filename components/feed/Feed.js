import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import Spinner from "../main/Spinner";
import { getPins } from "../../firebase/utils";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { filterPins } from "../../utils/helpers";
import { useRouter } from "next/router";

const Feed = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [filteredPins, setFilteredPins] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { category } = router.query;
  const fetchPins = async () => {
    const pins = await getPins(category);
    console.log(pins);
    setPins(pins);
    setFilteredPins(pins);
    setLoading(false);
  };
  useEffect(() => {
    fetchPins();
  }, [category]);

  useEffect(() => {
    if (pins && pins.length) {
      const searchResult = filterPins(pins, searchTerm);
      setFilteredPins(searchResult);
    }
  }, [searchTerm]);

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
  if (!filteredPins.length) {
    return (
      <div className="flex flex-col items-center">
        No pins match your search query, try modifying it
      </div>
    );
  }
  return (
    <div className="mx-5">
      {!!pins.length && <MasonryLayout pins={filteredPins} />}
    </div>
  );
};

export default Feed;
