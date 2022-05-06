import React, { FC, useState } from "react";
import AppNavigator from "./Navigator/AppNavigator";
import { enableScreens } from "react-native-screens";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { LogBox } from "react-native";
import styled from "styled-components";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

//enabled for better performaance screen loading
enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/static/OpenSans/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/static/OpenSans/OpenSans-Bold.ttf"),
  });
};

//app.js
const App: FC<{}> = () => {
  //local state
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return <AppNavigator />;
};
export default App;
