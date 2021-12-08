import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWdith = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  view: {
    backgroundColor: "grey",
    flex: 1,
    borderWidth: 2,
    borderColor: "green",
  },
  text: {
    padding: 4,
    fontSize: 20,
    width: windowWdith,
    borderColor: "red",
    borderWidth: 2,
  },
  title: { fontSize: 50, alignSelf: "center", padding: 10 },
  PressableText: {
    padding: 4,
    fontSize: 25,
    width: windowWdith / 2,
    borderColor: "red",
    borderWidth: 2,
    textAlign: "center",
  },
  pressable: {
    width: windowWdith / 2,
    marginHorizontal: windowWdith / 4,
    marginTop: 20,
  },
});
