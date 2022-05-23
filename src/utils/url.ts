import { CONFIG } from "../config";

const formatShortURL = (id: string) => {
  const URL = CONFIG.WEB_URL;

  // case1: URL = https://r.chnwt.dev/ || http://r.chnwt.dev/
  if (
    (URL.includes("https://") && URL.slice(-1) === "/") ||
    (URL.includes("http://") && URL.slice(-1) === "/")
  ) {
    return `${URL}${id}`;
  }
  // case2: URL = https://r.chnwt.dev || http://r.chnwt.dev
  if (
    (URL.includes("https://") && URL.slice(-1) !== "/") ||
    (URL.includes("http://") && URL.slice(-1) !== "/")
  ) {
    return `${URL}/${id}`;
  }
  // case3: URL = r.chnwt.dev/
  if (
    (!URL.includes("https://") && URL.slice(-1) === "/") ||
    (!URL.includes("http://") && URL.slice(-1) === "/")
  ) {
    return `http://${URL}${id}`;
  }
  // case4: URL = r.chnwt.dev
  if (
    (!URL.includes("https://") && URL.slice(-1) !== "/") ||
    (!URL.includes("http://") && URL.slice(-1) !== "/")
  ) {
    return `http://${URL}/${id}`;
  }

  return null;
};

const validURL = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(url);
};

const validCustomAlias = (customAlias: string) => {
  const pattern = /([^a-zA-Z0-9_-])/;
  return !pattern.test(customAlias);
};

export { formatShortURL, validURL, validCustomAlias };
