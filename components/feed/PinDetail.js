import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "../../components/main/Spinner";
import { createComment, getPin, getSimilarPins } from "../../firebase/utils";
import { MdDownloadForOffline, MdLocationOn } from "react-icons/md";
import MasonryLayout from "../../components/feed/MasonryLayout";
import Link from "next/link";

export default function PinDetail() {
  const [pinDetail, setPinDetail] = useState();
  const [similarPins, setSimilarPins] = useState([]);
  const [comment, setComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { pinId } = router.query;

  const fetchPin = async (withSimilar = false) => {
    const pin = await getPin(pinId);
    setPinDetail(pin);
    if (withSimilar && pin) {
      console.log(pin);
      const pins = await getSimilarPins(pinId, pin.category);
      setSimilarPins(pins);
    }
    setLoading(false);
  };
  const addComment = async () => {
    if (!postingComment) {
      setPostingComment(true);
      await createComment({ ...pinDetail, comment });
      await fetchPin();
      setPostingComment(false);
      setComment("");
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchPin(true);
  }, [pinId]);

  if (!pinDetail) {
    return <Spinner message="Fetching pin..." />;
  }

  return (
    <>
      {pinDetail && (
        <div
          className="flex xl:flex-row mx-5 p-5 flex-col bg-white"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          <div>
            <img
              className="rounded-lg"
              src={pinDetail?.image}
              alt="user-post"
            />
          </div>
          <div className="w-full pt-5 lg:p-5 lg:pt-0 flex-1 xl:min-w-620">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold break-words">
                  {pinDetail.title}
                </h1>
                <Link
                  href="/"
                  className="hidden md:block capitalize bg-secondaryColor text-black font-bold p-2 px-4 rounded-full shadow-sm w-fit opacity-75 hover:opacity-100"
                >
                  {pinDetail.category}
                </Link>
                <a
                  href={pinDetail.image}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <Link
                href="/"
                className="block md:hidden my-2 capitalize bg-secondaryColor text-black font-bold p-2 px-4 rounded-full shadow-sm w-fit opacity-75 hover:opacity-100"
              >
                {pinDetail.category}
              </Link>
              <h2 className="mt-1 text-xl">{pinDetail.about}</h2>
              <div className="flex items-center gap-1 mt-3 bg-secondaryColor p-2 px-4 text-xl rounded-full flex items-center justify-center text-dark w-fit">
                <div>
                  <MdLocationOn />
                </div>
                <div
                  className="whitespace-nowrap w-fit text-ellipsis overflow-hidden"
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  {pinDetail.destination}
                </div>
              </div>
            </div>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {!pinDetail?.comments?.length && (
                <p className="mt-1 font-light">No comments, yet :(</p>
              )}
              {pinDetail?.comments?.map((item) => (
                <div
                  className="flex gap-2 mt-3 items-center bg-white rounded-lg"
                  key={item.comment}
                >
                  <img
                    src="https://www.pngitem.com/pimgs/m/105-1055689_user-account-person-avatar-operating-system-grey-user.png"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-3 gap-3">
              {/* <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
              </Link> */}
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none opacity-75 hover:opacity-100"
                onClick={addComment}
              >
                {postingComment ? "Posting" : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
      {similarPins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {similarPins ? (
        <div className="mx-5">
          <MasonryLayout pins={similarPins} />
        </div>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
}
