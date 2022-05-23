import { nanoid } from "nanoid";
import { doc, getDoc } from "firebase/firestore";
import { CONFIG, MSG } from "../config/index";
import db from "./firestore";

const MAX_LIMIT = 4;
let COUNT = 0;

const isExist = async (id: string) => {
  const docRef = doc(db, CONFIG.FIREBASE_COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
};

const generateID = async () => {
  if (COUNT > MAX_LIMIT) return MSG.TIMEOUT;
  COUNT += 1;

  const randomID = nanoid(5);
  const validID: string = await isExist(randomID).then((isDup) =>
    isDup ? generateID() : randomID
  );

  COUNT = 0;

  return validID;
};

export { generateID, isExist };
