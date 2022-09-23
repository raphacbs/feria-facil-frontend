import React, { useEffect, useState, useRef } from "react";
import { BASE_URL, X_API_KEY } from "@env";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";

import {
  Toast,
  FlatList,
  Input,
  Icon,
  VStack,
  Stack,
  Fab,
  Box,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import {
  fetchShoppingCart,
  getShoppingCart,
  resetStatus,
} from "./shoppingCartSlice";
import Container from "../../components/ContainerMain";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export default function ShoppingCartScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.shoppingCartReducer.status);
  const error = useSelector((state) => state.shoppingCartReducer.error);
  const { shoppingListId } = route.params;
  const shoppingCart = useSelector(getShoppingCart);

  // useEffect(() => {
  //   console.log("entrou", status);
  //   if (status === "idle") {
  //     dispatch(fetchShoppingCart(shoppingListId));
  //     dispatch(resetStatus({ status: "idle" }));
  //   }
  // }, [status, dispatch]);

  useEffect(() => {
    console.log("entrou", status);
    dispatch(fetchShoppingCart(shoppingListId));
  }, []);

  const onRefresh = async () => {
    dispatch(fetchShoppingCart(shoppingListId));
  };

  const keyExtractor = (item) => item.id;

  const edit = async (cartItem) => {
    try {
      setCartItemIsLoaded(false);
      const url = `${BASE_URL}/api/v1/shopping-carts/${id}/cart-item`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
        body: JSON.stringify(cartItem),
      });
      const json = await response.json();
      setShoppingCart(json);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
      setCartItemIsLoaded(true);

      Toast.show({
        title: "Valores atualizados",
      });
    }
  };

  const removerCartItem = async (cartItem) => {
    try {
      console.log("removerCartItem");
      setLoading(true);
      const url = `${BASE_URL}/api/v1/cart-items/${cartItem.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
      });
      const json = await response.json();
      console.log(json);
      await getItems();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (cartItem) => {
    console.log("update");
    try {
      const url = `${BASE_URL}/api/v1/shopping-carts/${id}/cart-item`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
        body: JSON.stringify(cartItem),
      });
      const json = await response.json();

      setShoppingCart(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const readItemCodeBar = () => {
    navigation.navigate("ReadBarCode", {
      idShoppingCart: id,
      scannerAgain: false,
    });
  };

  const renderItem = ({ item, index }) => (
    <CartItem index={index + 1} cartItem={item}></CartItem>
  );

  const lastItem = () => <Box marginBottom={70}></Box>;

  return (
    <Stack flex={1}>
      <Container
        // loading={true}
        loading={status === "loading" || status === "idle"}
        error={error}
        refreshControl={false}
        onRefresh={() => {
          dispatch(fetchShoppingCart(shoppingListId));
        }}
      >
        {/* {shoppingCart.cartItems != null && shoppingCart.cartItems.length > 0 ? ( */}
        <FlatList
          flex={1}
          keyExtractor={keyExtractor}
          data={shoppingCart.cartItems}
          renderItem={renderItem}
          refreshing={status == "loading"}
          onRefresh={onRefresh}
          ListFooterComponent={lastItem}
        />
        <Fab
          renderInPortal={false}
          shadow={2}
          onPress={readItemCodeBar}
          size="md"
          icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
        />
      </Container>
    </Stack>
  );
}
