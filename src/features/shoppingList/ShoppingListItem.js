import React from "react";
import {
  VStack,
  HStack,
  Actionsheet,
  Box,
  Text,
  Icon,
  AlertDialog,
  Heading,
  Button,
  IconButton,
  Center,
  Pressable,
  Progress,
} from "native-base";
import {
  FontAwesome,
  MaterialIcons,
  Zocial,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { putPostShoppingList } from "./shoppingListSlice";

export default ShoppingListItem = (props) => {
  const { shoppingList, onPress } = props;
  const cancelRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenActionSheet, setIsOpenActionSheet] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const onCloseActionSheet = () => setIsOpenActionSheet(false);
  const dispatch = useDispatch();

  const updateArchive = (archived) => {
    const shoppingListToSave = {
      id: shoppingList.id,
      description: shoppingList.description,
      archived: archived,
      supermarket: shoppingList.supermarket,
    };
    dispatch(putPostShoppingList(shoppingListToSave));
  };

  const calculateProgress = (partialValue, totalValue) => {
    let percentile = ((partialValue / totalValue) * 100).toFixed();
    return parseInt(percentile);
  };

  return (
    // <TouchableOpacity onPress={props.onPress}>
    <Pressable
      rounded={8}
      shadow={5}
      p={2}
      bgColor={"gray.200"}
      safeAreaRight
      width="95%"
      margin={2}
      borderWidth="1"
      borderColor="gray.200"
      onPress={() => {
        onPress && onPress(shoppingList);
      }}
    >
      <HStack>
        <Box
          marginLeft={-2}
          marginBottom={-2}
          marginTop={-2}
          marginRight={2}
          roundedLeft={8}
          bgColor={shoppingList.archived ? "gray.400" : "green.800"}
          w={1}
        ></Box>
        <VStack width="100%">
          <HStack space={2} justifyContent="space-between">
            <Center>
              <Heading size={"sm"}>{shoppingList.description}</Heading>
            </Center>
            <IconButton
              size={"md"}
              variant="ghost"
              alignSelf={"flex-end"}
              onPress={() => {
                setIsOpenActionSheet(true);
              }}
              _icon={{
                as: MaterialCommunityIcons,
                name: "dots-vertical",
                color: "gray.600",
              }}
            />
          </HStack>
          <HStack space={2} justifyContent="space-between">
            <HStack>
              <Icon
                marginTop={1}
                as={MaterialIcons}
                name="place"
                color="amber.600"
              />
              <Text>{shoppingList.supermarket}</Text>
            </HStack>
            <Heading marginRight={2} color={"blue.800"} size={"sm"}>
              {shoppingList.amount}
            </Heading>
          </HStack>
          <HStack space={2} justifyContent="space-between">
            <HStack>
              <Icon
                margin={1}
                as={FontAwesome}
                name="calendar"
                color="gray.500"
              />
              <Text>{shoppingList.createAt}</Text>
            </HStack>
            <HStack>
              <Icon
                marginRight={2}
                as={Zocial}
                name="cart"
                color="gray.500"
                size={"md"}
              />
              <Text marginRight={2}>{shoppingList.amountProducts}</Text>
            </HStack>
          </HStack>

          <Box w="100%">
            <Progress
              bg="coolGray.100"
              _filledTrack={{
                bg: "lime.500",
              }}
              value={calculateProgress(
                shoppingList.amountCheckedProducts,
                shoppingList.amountProducts
              )}
              size="sm"
            />
          </Box>
        </VStack>
      </HStack>
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Finalizar lista</AlertDialog.Header>
            <AlertDialog.Body>
              <Text>
                Deseja finalizar a lista
                <Heading size={"sm"}> {shoppingList.description}</Heading>?
              </Text>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Não
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    onClose();
                    updateArchive(true);
                  }}
                >
                  Sim
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
      <Center>
        <Actionsheet isOpen={isOpenActionSheet} onClose={onCloseActionSheet}>
          <Actionsheet.Content>
            <Actionsheet.Item
              onPress={() => {
                //props.onPressEdit(shoppingList);
                navigation.navigate("CreateShoppingList", {
                  item: shoppingList,
                });
              }}
              isDisabled={shoppingList.archived}
            >
              Editar
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                onCloseActionSheet();
                setIsOpen(true);
              }}
            >
              {shoppingList.archived ? "Reabrir" : "Finalizar"}
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                onCloseActionSheet();
              }}
              isDisabled
            >
              Comparar
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                onCloseActionSheet();
              }}
            >
              Cancelar
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </Pressable>
    //  </TouchableOpacity>
  );
};
