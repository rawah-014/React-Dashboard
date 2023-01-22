import axios from 'axios';

import {
    ALL_OFFERS_REQUEST,
    ALL_OFFERS_SUCCESS,
    ALL_OFFERS_FAIL,
    ADMIN_OFFERS_REQUEST,
    ADMIN_OFFERS_SUCCESS,
    ADMIN_OFFERS_FAIL,
    NEW_OFFER_REQUEST,
    NEW_OFFER_SUCCESS,
    NEW_OFFER_FAIL,
    DELETE_OFFER_REQUEST,
    DELETE_OFFER_SUCCESS,
    DELETE_OFFER_FAIL,
    UPDATE_OFFER_REQUEST,
    UPDATE_OFFER_SUCCESS,
    UPDATE_OFFER_FAIL,
    OFFER_DETAILS_REQUEST,
    OFFER_DETAILS_SUCCESS,
    OFFER_DETAILS_FAIL,

    CLEAR_ERRORS

} from '../constants/offerConstants'

export const getOffers = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_OFFERS_REQUEST })

        let link = `/api/v1/OFFERs?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/v1/OFFERs?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_OFFERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_OFFERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newOffer = (offerData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_OFFER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

			const { data } = await axios.post(`/api/v1/admin/Offer/new`, JSON.stringify(offerData), config)

        dispatch({
            type: NEW_OFFER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_OFFER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete OFFER (Admin)
export const deleteOffer = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_OFFER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/offer/${id}`)

        dispatch({
            type: DELETE_OFFER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_OFFER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update OFFER (ADMIN)
export const updateOffer = (id, offerData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_OFFER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/offer/${id}`, JSON.stringify(offerData), config)

        dispatch({
            type: UPDATE_OFFER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_OFFER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getOfferDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: OFFER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/offer/${id}`)

        dispatch({
            type: OFFER_DETAILS_SUCCESS,
            payload: data.offer
        })

    } catch (error) {
        dispatch({
            type: OFFER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminOffers = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_OFFERS_REQUEST })

        const { data } = await axios.get(`/api/v1/offers`)

        dispatch({
            type: ADMIN_OFFERS_SUCCESS,
            payload: data.offers
        })

    } catch (error) {

        dispatch({
            type: ADMIN_OFFERS_FAIL,
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