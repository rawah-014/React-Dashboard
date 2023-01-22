import axios from 'axios';

import {
    ALL_DELIVERYS_REQUEST,
    ALL_DELIVERYS_SUCCESS,
    ALL_DELIVERYS_FAIL,
    ADMIN_DELIVERYS_REQUEST,
    ADMIN_DELIVERYS_SUCCESS,
    ADMIN_DELIVERYS_FAIL,
    NEW_DELIVERY_REQUEST,
    NEW_DELIVERY_SUCCESS,
    NEW_DELIVERY_FAIL,
    DELETE_DELIVERY_REQUEST,
    DELETE_DELIVERY_SUCCESS,
    DELETE_DELIVERY_FAIL,
    UPDATE_DELIVERY_REQUEST,
    UPDATE_DELIVERY_SUCCESS,
    UPDATE_DELIVERY_FAIL,
    DELIVERY_DETAILS_REQUEST,
    DELIVERY_DETAILS_SUCCESS,
    DELIVERY_DETAILS_FAIL,
   
    CLEAR_ERRORS

} from '../constants/deliveryConstants'

export const getDeliverys = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_DELIVERYS_REQUEST })

        let link = `/api/v1/DELIVERYs?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/v1/DELIVERYs?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_DELIVERYS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_DELIVERYS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newDelivery = (deliveryData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_DELIVERY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

			const { data } = await axios.post(`/api/v1/admin/delivery/new`, JSON.stringify(deliveryData), config)

        dispatch({
            type: NEW_DELIVERY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_DELIVERY_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete DELIVERY (Admin)
export const deleteDelivery = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_DELIVERY_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/delivery/${id}`)

        dispatch({
            type: DELETE_DELIVERY_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_DELIVERY_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update DELIVERY (ADMIN)
export const updateDelivery = (id, deliveryData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_DELIVERY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/delivery/${id}`, JSON.stringify(deliveryData), config)

        dispatch({
            type: UPDATE_DELIVERY_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_DELIVERY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getDeliveryDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELIVERY_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/delivery/${id}`)

        dispatch({
            type: DELIVERY_DETAILS_SUCCESS,
            payload: data.delivery
        })

    } catch (error) {
        dispatch({
            type: DELIVERY_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}




export const getAdminDeliverys = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_DELIVERYS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/deliverys`)

        dispatch({
            type: ADMIN_DELIVERYS_SUCCESS,
            payload: data.deliverys
        })

    } catch (error) {

        dispatch({
            type: ADMIN_DELIVERYS_FAIL,
            payload: error.response.data.message
        })
    }
}





// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}