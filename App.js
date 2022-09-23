import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, extendTheme } from "native-base";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

import ScreenSnack from "./src/navigation/ScreenSnack";
import { store } from "./src/store";

function App() {
  // SplashScreen.preventAutoHideAsync()
  //   .then((result) =>
  //     console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  //   )
  //   .catch(console.warn);

  // useEffect(() => {
  //   // setTimeout(async () => {
  //   //   await SplashScreen.hideAsync();
  //   // }, 5000);
  // }, []);

  const theme = extendTheme({
    colors: {
      primary: {
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#0088CC",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E",
      },
      amber: {
        400: "#d97706",
      },
      theme: {
        principal: "#0099e6",
      },
    },
    config: {
      initialColorMode: "light",
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <ScreenSnack />
        </NavigationContainer>
        <StatusBar style="light" />
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
