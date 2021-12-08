import { db } from "./firestoreConfig.js";
import { collection, getDocs, query, where } from "firebase/firestore";


export const selectAllEvents = () => {
  getDocs(collection(db, "events"))
    .then((snapshot) => {
      let eventsArray = [];
      snapshot.docs.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
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
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.insertNewEvent = (eventObject) => {
//   const newPost = doc(db, "events");
//   setDoc(newPost, eventObject)
//     .then(() => {
//       console.log("new event added");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // INSERT DATA FORMAT AS 

// exports.insertNewEvent({
//     first_name: 'Bruno',
//     last_name: 'Dewane',
//     image_bitmap: '8098203360'
//   })


