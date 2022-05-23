import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import db from "../utils/firestore";
import { validURL, validCustomAlias, formatShortURL } from "../utils/url";
import { isExist, generateID } from "../utils/id";
import { CONFIG, MSG } from "../config";

const generateURL = async (fullURL: string, customAlias?: string) => {
  // handle invalid URL
  if (fullURL && !validURL(fullURL))
    return {
      status: MSG.FAILURE,
      response: "URL pattern is invalid.",
      code: 400,
    };
  // custom alias
  if (customAlias) {
    // handle invalid custom alias pattern
    if (!validCustomAlias(customAlias))
      return {
        status: MSG.FAILURE,
        response: "Custom alias pattern is invalid.",
        code: 400,
      };
    // check is duplicate and store data
    const result = (await isExist(customAlias))
      ? {
          status: MSG.FAILURE,
          response: "Custom alias is already exists.",
          code: 400,
        }
      : await setDoc(doc(db, CONFIG.FIREBASE_COLLECTION_NAME, customAlias), {
          fullURL,
          created: serverTimestamp(),
        }).then(() => {
          return {
            status: MSG.SUCCESS,
            response: {
              id: customAlias,
              shortURL: formatShortURL(customAlias),
              fullURL,
            },
            code: 201,
          };
        });

    return result;
  }
  // random id
  const randomID = await generateID();
  // check id is valid and store data
  const result =
    randomID === MSG.TIMEOUT
      ? {
          status: MSG.FAILURE,
          response: "Can't generate ID, Please try again later.",
          code: 500,
        }
      : await setDoc(doc(db, CONFIG.FIREBASE_COLLECTION_NAME, randomID), {
          fullURL,
          created: serverTimestamp(),
        }).then(() => {
          return {
            status: MSG.SUCCESS,
            response: {
              id: randomID,
              shortURL: formatShortURL(randomID),
              fullURL,
            },
            code: 201,
          };
        });

  return result;
};

const getURL = async (shortURL: string) => {
  const docRef = doc(db, CONFIG.FIREBASE_COLLECTION_NAME, shortURL);
  const docSnap = await getDoc(docRef);
  // check data is exists
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      status: MSG.SUCCESS,
      response: {
        fullURL: data.fullURL,
      },
      code: 200,
    };
  }
  // data not found
  return {
    status: MSG.FAILURE,
    response: "URL not found.",
    code: 404,
  };
};

export { generateURL, getURL };
