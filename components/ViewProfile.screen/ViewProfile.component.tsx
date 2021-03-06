import React, { useState , useEffect } from "react";
import { Text, Image, View, Pressable } from "react-native";
import { styles } from "./ViewProfile.style";
import { SafeAreaView } from "react-native-safe-area-context";
import {  getUserById } from "../../utils/utils";
import { getDownloadURL, ref }   from 'firebase/storage'
import { storage } from "../../utils/firestoreConfig.js"

export const ViewProfile = ({ route, navigation }) => {
    const { userId } = route.params;
    const [imgURL, setImgURL] = useState("")
    const [userImage, setUserImage] = useState(null)
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        hosted_events: [],
        last_name: '',
        image_bitmap: '',        
        requested_events: []
    })


    useEffect(() => {

        getUserById(userId)
            .then((userData) => {
                setImgURL(userData?.image_bitmap)
                setUserDetails(userData)
                return imgURL
            })
            .then((imgURL) => {
                console.log(imgURL)
                let storageRef = ref(storage, imgURL )
                return getDownloadURL(storageRef)
            })
            .then((image) => {
                setImgURL(image)
                return imgURL
            })
            .catch((err) => {
                console.log(err)
            })
    }, [userImage,userId]);

    return (
        <SafeAreaView style={styles.container}>
            <View>
            <Text style={styles.title}>View User</Text> 
                {imgURL ? <Image source={{ uri: imgURL }} style={styles.avatar} /> : null}
            <Text style={styles.title}>{userDetails.first_name} {userDetails.last_name}</Text>
            <Text style={styles.title}>{userDetails.description}</Text>
            </View>
            <Pressable
        style={styles.item}
        onPress={() => {
          navigation.navigate("AcceptReject");
        }}
      >
        <Text>Back Button</Text>
      </Pressable>
        
        </SafeAreaView>

    )
}