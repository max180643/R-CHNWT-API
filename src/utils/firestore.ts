import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { CONFIG } from "../config";

const app = initializeApp(CONFIG.FIREBASE);
const db = getFirestore(app);

export default db;
