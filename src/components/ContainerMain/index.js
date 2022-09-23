import React from "react";
import LottieView from "lottie-react-native";
import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
  Stack,
} from "native-base";
import { animation, errorAnimation } from "./styles";
import { RefreshControl } from "react-native";

const Container = (props) => {
  const { loading, children, error, refreshControl, onRefresh } = props;
  const w = props.with ? props.with : "100%";
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(loading);
  const [_error, setError] = React.useState(error);

  React.useEffect(() => {
    setIsLoading(loading);
    setError(error);
  }, [props]);

  const handleRefresh = () => {
    if (onRefresh) {
      setRefreshing(true);
      onRefresh();
      setRefreshing(false);
    }
  };

  return (
    <Center w={w}>
      {refreshControl ? (
        <RefreshControl
          style={{
            justifyContent: "center",
            //alignSelf: "center",
            alignItems: "center",
            width: w,
          }}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        >
          <Center {...props} w={w} h="100%">
            {error ? (
              <Center>
                <LottieView
                  source={require("../../../assets/animations/error_animation.json")}
                  style={animation}
                  autoPlay
                />
                <Heading size={"sm"}>Ops! Ocorreu um erro.</Heading>
                <Text marginBottom={2} fontSize={11}>
                  {error.message}
                </Text>
                <Button onPress={handleRefresh}>Tente Novamente</Button>
              </Center>
            ) : isLoading ? (
              <Center>
                <LottieView
                  source={require("../../../assets/animations/loading_animation.json")}
                  style={animation}
                  autoPlay
                />
              </Center>
            ) : (
              children
            )}
          </Center>
        </RefreshControl>
      ) : (
        <Center {...props} w={w} h="100%">
          {_error ? (
            <Center>
              <LottieView
                source={require("../../../assets/animations/error_animation.json")}
                style={errorAnimation}
                autoPlay
              />
              <Heading size={"sm"}>Ops! Ocorreu um erro.</Heading>
              <Text marginBottom={2} fontSize={11}>
                {_error}
              </Text>
              <Button onPress={handleRefresh}>Tente Novamente</Button>
            </Center>
          ) : isLoading ? (
            <Center>
              <LottieView
                source={require("../../../assets/animations/loading_cart.json")}
                style={animation}
                autoPlay
              />
            </Center>
          ) : (
            children
          )}
        </Center>
      )}
    </Center>
  );
};

export default Container;
