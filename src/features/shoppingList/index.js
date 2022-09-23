import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Stack, Icon, Fab, Box, VStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ShoppingListItem from "./ShoppingListItem";
import { useSelector, useDispatch } from "react-redux";
import { selectAll, fetchShoppingLists } from "./shoppingListSlice";
import Container from "../../components/ContainerMain";
import {
  resetShoppingCart,
  resetStatus,
} from "../shoppingCart/shoppingCartSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function ShoppingListScreen(props) {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const shoppingLists = useSelector(selectAll);
  const navigate = useNavigation();

  const shoppingListsStatus = useSelector(
    (state) => state.shoppingListReducer.status
  );
  const error = useSelector((state) => state.shoppingListReducer.error);

  useEffect(() => {
    if (shoppingListsStatus === "idle") {
      dispatch(fetchShoppingLists());
    }
  }, [shoppingListsStatus, dispatch]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      console.log("focus");
      dispatch(resetStatus());
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const archive = () => {};

  const keyExtractor = (item) => item.id;

  const renderItem = ({ index, item }) => (
    <ShoppingListItem
      onPress={goToShoppingCartScreen}
      shoppingList={item}
    ></ShoppingListItem>
  );

  const lastItem = () => <Box marginBottom={70}></Box>;

  const goToShoppingCartScreen = (shoppingList) => {
    //dispatch(resetStatus({ status: "idle" }));
    navigation.navigate("ShoppingCart", {
      shoppingListId: shoppingList.id,
      name: shoppingList.description,
    });
  };

  const goToCreateShoppingListScreen = (item) => {
    navigation.navigate("CreateShoppingList", {
      item,
    });
  };

  return (
    <Stack flex={1}>
      <Container
        loading={shoppingListsStatus == "loading"}
        error={error}
        refreshControl={false}
        onRefresh={() => {
          dispatch(fetchShoppingLists());
        }}
      >
        <FlatList
          flex={1}
          keyExtractor={keyExtractor}
          data={shoppingLists}
          renderItem={renderItem}
          ListFooterComponent={lastItem}
          refreshing={shoppingListsStatus == "loading"}
          onRefresh={() => {
            dispatch(fetchShoppingLists());
          }}
        />
        <Fab
          renderInPortal={false}
          shadow={2}
          onPress={() => {
            goToCreateShoppingListScreen(null);
          }}
          size="md"
          icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
        />
      </Container>
    </Stack>
  );
}
