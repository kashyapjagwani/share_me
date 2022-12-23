import React, { useState, useEffect } from "react";
// import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from "./MasonryLayout";
import Spinner from "../main/Spinner";
import { getPins } from "../../firebase/utils";

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
  // const { categoryId } = useParams();
  // useEffect(() => {
  //   if (categoryId) {
  //     setLoading(true);
  //     const query = searchQuery(categoryId);
  //     client.fetch(query).then((data) => {
  //       setPins(data);
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(true);

  //     client.fetch(feedQuery).then((data) => {
  //       setPins(data);
  //       setLoading(false);
  //     });
  //   }
  // }, [categoryId]);
  // const ideaName = categoryId || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${`ideaName`} ideas to your feed!`} />
    );
  }
  return <div>{!!pins.length && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
