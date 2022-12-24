import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { createPin, saveImage } from "../../firebase/utils";
import { categories } from "../../utils/data";
import Spinner from "../main/Spinner";
import { useRouter } from "next/router";

export default function CreatePin() {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState("");
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState({});
  const [wrongImageType, setWrongImageType] = useState(false);

  const router = useRouter();

  const uploadImage = (e) => {
    // name of file + timestamp
    const imageName = `${e.target.files[0].name}`;
    const imageReader = new FileReader();
    imageReader.onload = async () => {
      const imageData = {
        name: imageName,
        preview: imageReader.result,
        data: e.target.files[0],
      };
      setImageAsset(imageData);
    };
    imageReader.readAsDataURL(e.target.files[0]);
  };

  const savePin = async () => {
    // check for missing fields
    if (!imageAsset.name || !imageAsset.data) {
      setFields("an image");
    } else if (!title) {
      setFields("a title");
    } else if (!about) {
      setFields("an about");
    } else if (!destination) {
      setFields("a destination");
    } else if (!category) {
      setFields("a category");
    }

    // save pin to db
    // 1. upload image to firebase storage
    const link = await saveImage(imageAsset);
    // 2. save all fields to firestore
    await createPin({
      image: link,
      title,
      about,
      destination,
      category,
      user: "kashyap",
    });
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {!imageAsset.data ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    Use high-quality HEIC, JPG, JPEG, SVG, or PNG only
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/jpg, image/png, image/heic, image/svg"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full flex flex-col justify-center">
                <img src={imageAsset.preview} alt="uploaded-pic" />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset({})}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {/* {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )} */}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">
                  Select Category
                </option>
                {categories.map((item) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black "
                    value={item.name}
                    key={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 opacity-90 hover:opacity-100 text-white font-bold p-2 rounded-full w-full outline-none"
              >
                Save Pin
              </button>
            </div>
            {fields && (
              <p className="text-center text-red-500 mt-2 transition-all duration-150 ease-in ">
                Please add {fields}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
