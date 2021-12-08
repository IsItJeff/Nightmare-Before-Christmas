import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "./SingleEvent.style";

//API call to get event details
//selectEventsByEventID(eventID)

//Example of request
const eventDetails = {
  attendees: ["-MqFbx--rZQ1MsDKnDxB"],
  category: "running",
  date: "15/12/2021",
  description: "Explosion and rupture of pressurized-gas tank, init encntr",
  host_id: "MqFbwzzuLbOhneGLtDs",
  id: "-MqFdV5ywbsGMVlV_Dvc",
  location: "manchester",
  max_capacity: 5,
  pending_attendees: [""],
  title: "Running",
};

//Api call to get host details using eventDetails.host_id async/await?
//selectUserByUserId(eventDetails.host_id)

const hostDetails = {
  first_name: "Lilias",
};

export const SingleEvent = ({ navigation }) => {
  return (
    <>
      <View style={styles.view}>
        <Text style={styles.title}>{eventDetails.title}</Text>
        <Text style={styles.text}>Location: {eventDetails.location}</Text>
        <Text style={styles.text}>Category: {eventDetails.category}</Text>
        <Text style={styles.text}>Description: {eventDetails.description}</Text>
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
        <Text style={styles.text}>Host: {hostDetails.first_name}</Text>
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
};
