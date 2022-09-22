import { ShoppingCartModel } from "../../services/models";
import { GET_SHOPPING_CART, ERROR, GET_PRODUCTS_BY_DESCRIPTION, CLEAR_PRODUCT_LIST, PUT_SHOPPING_CART_ITEM, SHOW_LOADING_SHOPPING_CART_ITEM, DELETE_SHOPPING_CART_ITEM } from "../actions/types";

const initialState: ShoppingCartModel = {
    shoppingCart: {
        cartItems: [],
        totalCartItems: 0,
        totalProducts: 0,
        amountItems: "R$ 0,00",
        subtotalChecked: "R$ 0,00",
        totalProductsChecked: 0
    },
    cartItem: {
        id: "",
        shoppingCartId: "",
        product: {
            id: "",
            description: "",
            brand: "",
            image: "",
            ean: "",
            createAt: "",
            updateAt: "",
        },
        unitValue: "R$ 0,00",
        amountOfProduct: 0,
        subtotal: "R$ 0,00",
        createdAt: "24/08/2022 13:48:42",
        isChecked: false
    },
    products: [],
    loading: false
}

const shoppingCartReducer = (state: ShoppingCartModel = initialState, action: any) => {

    switch (action.type) {
        case GET_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: action.shoppingCart, loading: false
            }
        case GET_PRODUCTS_BY_DESCRIPTION:

            return {
                ...state,
                products: action.productResponse.products, loading: false
            }
        case PUT_SHOPPING_CART_ITEM:

            return {
                ...state,
                shoppingCart: action.shoppingCart, loading: false
            }
        case DELETE_SHOPPING_CART_ITEM:
            return {
                ...state, loading: false
            }
        case CLEAR_PRODUCT_LIST:
            return {
                ...state,
                products: [], loading: false
            }
        case SHOW_LOADING_SHOPPING_CART_ITEM:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default shoppingCartReducer;