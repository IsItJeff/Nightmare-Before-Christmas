import {doc, onSnapshot} from "firebase/firestore";
import React from "react";
import {useState, useContext, useEffect} from "react";
import {Text, Pressable, View, TouchableOpacity} from "react-native";
import {UserContext} from "../../contexts/UserContext";
import {db} from "../../utils/firestoreConfig";
import {getUsers, selectAllEvents, selectEventById} from "../../utils/utils";
import {
  makeNameIdReference,
  truncate,
} from "../Events.screen/utils/EventListUtils";
import {styles} from "./ProfileEvents.style";
import {confirmLeave} from "./ProfileUtils";

export const MyPendingRequests = ({user_id, navigation}) => {
  const {currentUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userNames, setUserNames] = useState({});
  const [pendingRequestIds, setPendingRequestIds] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([
    {
      title: "dummy",
      host_id: "dummy",
      location: "dummy",
      date: "dummy",
      category: "dummy",
      time: "dummy",
      description: "dummy",
    },
  ]);

  useEffect(() => {
    const eventPromises: any = pendingRequestIds.map((eventId) => {
      return selectEventById(eventId);
    });
    Promise.all(eventPromises).then((res: any) => {
      res.forEach((event, index) => {
        event.id = pendingRequestIds[index];
      });

      setPendingRequests(res);
    });
    setIsLoading(false);
    (async () => {
      const nameUidReferenceObject = await getUsers();
      setUserNames(makeNameIdReference(nameUidReferenceObject));
    })();
  }, [pendingRequestIds]);

  React.useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(doc(db, "users", user_id), (doc: any) => {
      if (doc.data().requested_events.length > 0) {
        setPendingRequestIds(doc.data().requested_events);
      } else {
        setPendingRequestIds([]);
      }
    });
  }, [user_id]);

  if (isLoading) {
    return <Text>Loading event requests ...</Text>;
  }
  if (pendingRequests.length < 1) {
    return (
      <Text style={styles.joinSubHeader}>
        You have no pending event requests.
      </Text>
    );
  }
  return (
    <View>
      <Text style={styles.joinSubHeader}>Pending Join Requests</Text>
      {pendingRequests.map((myEvent) => {
        return (
          <View style={styles.container} key={myEvent.id}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate("Event", {eventId: myEvent.id});
              }}
            >
              <Text style={styles.title}>{myEvent.title}</Text>
              <Text style={styles.user}>{userNames[myEvent.host_id]}</Text>
              <Text style={styles.location}>{myEvent.location}</Text>
              <Text style={styles.date}>{myEvent.date}</Text>
              <Text style={styles.category}>{myEvent.category}</Text>
              <Text style={styles.time}>{myEvent.time}</Text>
              <Text style={styles.description}>
                {truncate(myEvent.description)}
              </Text>
            </TouchableOpacity>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? "rgba(108, 93, 171, 0.5)"
                    : "rgba(108, 93, 171, 1)",
                },
                styles.requestsButton,
              ]}
              onPress={() => {
                const userInfo = {
                  first_name: currentUser.first_name,
                  last_name: currentUser.last_name,
                  userId: currentUser.id,
                };
                confirmLeave(userInfo, myEvent.id);
              }}
            >
              <Text style={styles.buttonTitle}>Cancel Request</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};
