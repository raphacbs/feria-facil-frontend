import React, { useEffect, useState } from "react";
import {
  Input,
  Icon,
  Box,
  Stack,
  VStack,
  Image,
  ScrollView,
  View,
  Heading,
  Button,
  HStack,
} from "native-base";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Masks, useMaskedInputProps } from "react-native-mask-input";
import NumericInput from "react-native-numeric-input";

const ProductComponent = (props) => {
  const [product, setProduct] = useState({ ...props.product });
  const [isEditing, setIsEditing] = useState(props.isEditing);
  const [amountOfProduct, setAmountOfProduct] = useState(1);
  const [subtotal, setSubtotal] = useState("");
  useEffect(() => {
    setProduct(props.product);
  }, [props.product, props.isEditing]);

  const subTotalMaskedInputProps = useMaskedInputProps({
    value: subtotal,
    onChangeText: (text) => setProduct({ ...product, ["subtotal"]: text }),
    mask: Masks.BRL_CURRENCY,
  });

  const handleSubtotal = (count) => {
    setAmountOfProduct(count);
    let unitValue = 0;
    if (product.unitValue != undefined) {
      unitValue = parseFloat(
        product.unitValue.replace(",", ".").replace("R$", "").trim()
      );
    }
    setSubtotal((unitValue * count).toFixed(2).toString().replace(".", ""));
  };

  const onEndEditing = (value) => {
    handleSubtotal(amountOfProduct);
  };

  const unitValueMaskedInputProps = useMaskedInputProps({
    value: product.unitValue,
    onChangeText: (text) => {
      setProduct({ ...product, ["unitValue"]: text });
    },
    mask: Masks.BRL_CURRENCY,
  });

  const insert = () => {
    let item = {
      id: product.id,
      unitValue: product.unitValue.replace("R$", "").trim(),
      amountOfProduct: amountOfProduct,
      image: "",
      description: product.description,
      manufacturer: product.manufacturer,
      ean: product.ean,
    };

    props.onInsert(item);
  };

  return (
    <VStack
      bgColor={"theme.principal"}
      flex={1}
      alignItems="center"
      justifyContent={"center"}
      width="100%"
    >
      <Box
        width="90%"
        rounded="lg"
        overflow="scroll"
        borderColor="coolGray.200"
        borderWidth="1"
        bgColor={"white"}
        shadow={6}
        h="95%"
      >
        <ScrollView
          maxW="full"
          w="100%"
          h="100%"
          _contentContainerStyle={{
            px: "3px",
            mb: "4",
            minW: "50",
          }}
        >
          <VStack space={4} w="100%" h="90%" alignItems="center">
            <Image
              size={150}
              resizeMode={"contain"}
              borderRadius={100}
              source={{
                uri: product.image,
              }}
              alt="Alternate Text"
            />
            <Input
              size="full"
              w={{
                base: "100%",
                md: "25%",
              }}
              isReadOnly
              value={product.ean}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="barcode" />}
                  size={6}
                  ml="3"
                  color="muted.400"
                />
              }
              placeholder="barCode"
            />
            <Input
              size="full"
              w={{
                base: "100%",
                md: "25%",
              }}
              isReadOnly={isEditing}
              value={product.description}
              onChangeText={(text) =>
                setProduct({ ...product, ["description"]: text })
              }
              InputLeftElement={
                <Icon
                  as={<Entypo name="text" />}
                  size={6}
                  ml="3"
                  color="muted.400"
                />
              }
              placeholder="Descrição"
            />
            <Input
              size="full"
              w={{
                base: "100%",
                md: "25%",
              }}
              isReadOnly={isEditing}
              value={product.manufacturer}
              onChangeText={(text) =>
                setProduct({ ...product, ["manufacturer"]: text })
              }
              InputLeftElement={
                <Icon
                  as={<MaterialCommunityIcons name="factory" />}
                  size={6}
                  ml="3"
                  color="muted.400"
                />
              }
              placeholder="Fabricante"
            />

            <HStack space={1}>
              <Input
                flex={1}
                {...unitValueMaskedInputProps}
                size="full"
                w={{
                  base: "100%",
                  md: "25%",
                }}
                isReadOnly={false}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome name="money" />}
                    size={6}
                    ml="3"
                    color="muted.400"
                  />
                }
                defaultValue="01"
                onEndEditing={onEndEditing}
                placeholder="Valor Unitário"
                keyboardType="numeric"
              />
              <NumericInput
                value={amountOfProduct}
                onChange={handleSubtotal}
                rounded
              />
            </HStack>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 2 }}></View>
              <View style={{ flex: 1, alignItems: "flex-end" }}></View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 7, justifyContent: "center" }}>
                <Heading>Valor total:</Heading>
              </View>
              <View style={{ flex: 6 }}>
                <Input
                  {...subTotalMaskedInputProps}
                  size="2xl"
                  w={{
                    base: "100%",
                    md: "25%",
                  }}
                  isReadOnly={true}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="money" />}
                      size={6}
                      ml="3"
                      color="muted.400"
                    />
                  }
                  placeholder="0,00"
                />
              </View>
            </View>
            <View style={{ alignItems: "stretch" }}>
              <Button
                width={200}
                height={60}
                size="lg"
                onPress={insert}
                _text={{
                  color: "white",
                  fontSize: 25,
                }}
              >
                Inserir
              </Button>
            </View>
          </VStack>
        </ScrollView>
      </Box>
    </VStack>
  );
};

export default ProductComponent;
