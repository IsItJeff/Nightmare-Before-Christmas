import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  DB_APIKEY,
  DB_AUTHDOMAIN,
  DB_URL,
  DB_PROJECTID,
  DB_BUCKET,
  DB_MESSAGINGSENDERID,
  DB_APPID,
  DB_MEASUREMENTID,
} from "@env";

const firebaseConfig = {
  apiKey: DB_APIKEY,
  authDomain: DB_AUTHDOMAIN,
  databaseURL: DB_URL,
  projectId: DB_PROJECTID,
  storageBucket: DB_BUCKET,
  messagingSenderId: DB_MESSAGINGSENDERID,
  appId: DB_APPID,
  measurementId: DB_MEASUREMENTID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export function getData() {
  const db = getDatabase();
  const reference = ref(db, "user");
  onValue(reference, (snapshot) => {
    const clickEvent = snapshot.val().joke1;
    console.log(clickEvent);
  });
}

export function storeData() {
  const db = getDatabase();
  const reference = ref(db, "user");
  set(reference, {
    greeting: "Hello",
  });
  getData();
}
