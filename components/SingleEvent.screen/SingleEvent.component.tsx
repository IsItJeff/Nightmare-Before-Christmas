import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "./SingleEvent.style";
import { selectAllEvents, selectEventById } from "../../utils/utils";

export const SingleEvent = ({ navigation }) => {
  //Update when EventsList is added to main
  const eventId = "-MqFdV6-4eS7u0NojUhc";

  const [isLoading, setIsLoading] = React.useState(true);
  //Dummy object to shut up TS.
  const [eventDetails, setEventDetails] = React.useState({
    attendees: [""],
    category: "Dummy",
    date: "Dummmy",
    description: "Dummmy",
    host_id: "Dummmy",
    location: "Dummmy",
    max_capacity: 4,
    pending_attendees: [],
    title: "Dummmy",
  });
  React.useEffect(() => {
    setIsLoading(true);
    selectEventById(eventId).then((res: any) => {
      setEventDetails(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.view}>
          <Text style={styles.title}>{eventDetails.title}</Text>
          <Text style={styles.text}>Location: {eventDetails.location}</Text>
          <Text style={styles.text}>Category: {eventDetails.category}</Text>
          <Text style={styles.text}>
            Description: {eventDetails.description}
          </Text>
          <Text style={styles.text}>Date: {eventDetails.date}</Text>
          <Text style={styles.text}>
            Places: {eventDetails.attendees.length}/{eventDetails.max_capacity}
          </Text>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              //API call to join the event
              console.log("JOIN PRESSED");
            }}
          >
            <Text style={styles.PressableText}>Join this event?</Text>
          </Pressable>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>About the host:</Text>
          <Pressable
            onPress={() => {
              //Navigate back to EventsList when added to repo
              navigation.navigate("Home");
            }}
            style={styles.pressable}
          >
            <Text style={styles.PressableText}>Go back to events</Text>
          </Pressable>
        </View>
      </>
    );
  }
};
