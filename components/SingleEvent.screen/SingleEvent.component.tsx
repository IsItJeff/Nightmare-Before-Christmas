import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "./SingleEvent.style";

//API call to get event details
//Mock details for visualisation only
const eventDetails = {
  title: "EVENT TITLE",
  location: "manchester",
  category: "Running",
  description: "Hey, I want to go running and a buddy would be nice",
  date: "23/01/2022 10:00 am",
};

const hostDetails = {
  name: "Will",
  bio: "Hey, I'm a jfnvenv jfnwn ndoenv eoinroe nvoiernor oivneron ieono eori oien ie",
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
        <Text style={styles.text}>Host: {hostDetails.name}</Text>
        <Text style={styles.text}>About me: {hostDetails.bio}</Text>
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
