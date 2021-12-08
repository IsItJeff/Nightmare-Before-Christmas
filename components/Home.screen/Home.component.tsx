import React from "react";
import { PhoneSignIn } from "../Auth.screen/Auth.component";
import { Screen } from "react-native-screens";

export const Home = () => {
  return (
    <Screen>
      <PhoneSignIn />
    </Screen>
  );
};
