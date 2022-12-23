import {
  collection,
  addDoc,
  doc,
  getDocs,
  getDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./config";

// pins db ref object
const PINS = collection(db, "pins");

export const saveImage = (image) => {
  if (!image) return;
  const imageRef = ref(storage, `images/${image.name}`);
  return uploadBytes(imageRef, image.data).then(() => {
    return getDownloadURL(ref(storage, `images/${image.name}`)).then(
      (imageLink) => {
        return imageLink;
      }
    );
  });
};

export const createPin = async (payload) => {
  try {
    await addDoc(PINS, {
      image: payload.image,
      title: payload.title,
      about: payload.about,
      destination: payload.destination,
      category: payload.category,
      user: payload.user,
      comments: [],
    });
    return;
  } catch (e) {
    console.error("Error creating pin: ", e);
  }
};

export const createComment = async (payload) => {
  try {
    const pinRef = doc(db, "pins", payload._id);
    await updateDoc(pinRef, {
      comments: [
        ...payload.comments,
        {
          comment: payload.comment,
          timestamp: Date.now(),
        },
      ],
    });
  } catch (e) {
    console.error("Error creating comment: ", e);
  }
};

export const getPins = async (category = "") => {
  try {
    const q = category
      ? query(PINS, where("category", "==", category))
      : query(PINS);
    const pins = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((pin) => {
      pins.push({
        _id: pin.id,
        ...pin.data(),
      });
    });
    return pins;
  } catch (e) {
    console.error("Error loading pins: ", e);
  }
};

export const getSimilarPins = async (pinId, category) => {
  try {
    const q = query(
      PINS,
      where("__name__", "!=", pinId),
      where("category", "==", category)
    );
    const pins = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((pin) => {
      pins.push({
        _id: pin.id,
        ...pin.data(),
      });
    });
    return pins;
  } catch (e) {
    console.error("Error loading similar pins: ", e);
  }
};
export const getPin = async (pinId) => {
  if (pinId) {
    const pinRef = doc(db, "pins", pinId);
    const pin = await getDoc(pinRef);
    return {
      _id: pin.id,
      ...pin.data(),
    };
  }
};
