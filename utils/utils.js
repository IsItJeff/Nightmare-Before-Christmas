import { db } from "./firestoreConfig.js";
import { collection, getDocs, getDoc, query, where, doc } from "firebase/firestore";


export const selectAllEvents = () => {
  getDocs(collection(db, "events"))
    .then((snapshot) => {
      let eventsArray = [];
      snapshot.docs.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
      return eventsArray
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectEventsByUser = (user_id) => {
  const q = query(collection(db, "events"), where("host_id", "==", user_id));
  getDocs(q)
    .then((snapshot) => {
      let eventsArray = [];
      snapshot.docs.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
      return eventsArray
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectEventById = (eventId) => {
  const docRef = doc(db, "events", eventId);
  getDoc(docRef).then((snapshot) => {
    const event = snapshot.data()
    console.log(event)
    return event
});
}
// export const addNewEvent = (newEvent) => {
//   const colRef = doc(db, "events");
//   setDoc(colRef, newEvent)
//     .then(() => {
//       console.log("new event added");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const addNewEvent = (newEvent) => {
//   const colRef = doc(db, "events")
//   addDoc(colRef, newEvent)
// }
