import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, newProductReducer, productReducer, productDetailsReducer, newReviewReducer, productReviewsReducer, reviewReducer } from './reducers/productReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers'

import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'

import { infosReducer, newInfoReducer ,infoReducer , infoDetailsReducer} from './reducers/infoReducers'

import { offersReducer, newOfferReducer, offerReducer, offerDetailsReducer } from './reducers/offerReducers'

import { deliverysReducer, newDeliveryReducer, deliveryReducer, deliveryDetailsReducer } from './reducers/deliveryReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,

    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,

    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    newReview: newReviewReducer,


    infos: infosReducer,
    newInfo: newInfoReducer,
    info:infoReducer,
    infoDetails: infoDetailsReducer,

    deliverys: deliverysReducer,
    deliveryDetails: deliveryDetailsReducer,
    newDelivery: newDeliveryReducer,
    delivery: deliveryReducer,

    offers: offersReducer,
    offerDetails: offerDetailsReducer,
    newOffer: newOfferReducer,
    offer: offerReducer,
})


let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;