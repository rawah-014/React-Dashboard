/*  import axios from 'axios';

import {
    ALL_INFOS_REQUEST,
    ALL_INFOS_SUCCESS,
    ALL_INFOS_FAIL,
    ADMIN_INFOS_REQUEST,
    ADMIN_INFOS_SUCCESS,
    ADMIN_INFOS_FAIL,
    NEW_INFOS_REQUEST,
    NEW_INFOS_SUCCESS,
    NEW_INFOS_FAIL,
    DELETE_INFOS_REQUEST,
    DELETE_INFOS_SUCCESS,
    DELETE_INFOS_FAIL,
    UPDATE_INFOS_REQUEST,
    UPDATE_INFOS_SUCCESS,
    UPDATE_INFOS_FAIL,
    INFOS_DETAILS_REQUEST,
    INFOS_DETAILS_SUCCESS,
    INFOS_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/infoConstants'


export const getAdminInfos = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_INFOS_REQUEST })

        const { data } = await axios.get(`/api/v1/infos`)

        dispatch({
            type: ADMIN_INFOS_SUCCESS,
            payload: data.infos
        })

    } catch (error) {

        dispatch({
            type: ADMIN_INFOS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newInfos = (infosData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_INFOS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

			const { data } = await axios.post(`/api/v1/admin/info/new`, JSON.stringify(infosData), config)

        dispatch({
            type: NEW_INFOS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_INFOS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete INFO (Admin)
export const deleteInfos = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_INFOS_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/info/${id}`)

        dispatch({
            type: DELETE_INFOS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_INFOS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update INFO (ADMIN)
export const updateInfos = (id, infosData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_INFOS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/info/${id}`, infosData, config)

        dispatch({
            type: UPDATE_INFOS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_INFOS_FAIL,
            payload: error.response.data.message
        })
    }
}







// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}  */
 /* import axios from 'axios';

import {
    ALL_INFOS_REQUEST,
    ALL_INFOS_SUCCESS,
    ALL_INFOS_FAIL,
    ADMIN_INFOS_REQUEST,
    ADMIN_INFOS_SUCCESS,
    ADMIN_INFOS_FAIL,
    NEW_INFO_REQUEST,
    NEW_INFO_SUCCESS,
    NEW_INFO_FAIL,
    DELETE_INFO_REQUEST,
    DELETE_INFO_SUCCESS,
    DELETE_INFO_FAIL,
    UPDATE_INFO_REQUEST,
    UPDATE_INFO_SUCCESS,
    UPDATE_INFO_FAIL,
    INFO_DETAILS_REQUEST,
    INFO_DETAILS_SUCCESS,
    INFO_DETAILS_FAIL,
    
    CLEAR_ERRORS

} from '../constants/infoConstants'

export const getInfos = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_INFOS_REQUEST })

        let link = `/api/v1/INFOs?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/v1/INFOs?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_INFOS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_INFOS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newInfo = (infoData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_INFO_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

			const { data } = await axios.post(`/api/v1/admin/info/new`, infoData, config)

        dispatch({
            type: NEW_INFO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_INFO_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete INFO (Admin)
export const deleteInfo = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_INFO_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/info/${id}`)

        dispatch({
            type: DELETE_INFO_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_INFO_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update INFO (ADMIN)
export const updateInfo = (id, infoData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_INFO_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/info/${id}`, JSON.stringify(infoData), config)

        dispatch({
            type: UPDATE_INFO_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_INFO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getInfoDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: INFO_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/info/${id}`)

        dispatch({
            type: INFO_DETAILS_SUCCESS,
            payload: data.info
        })

    } catch (error) {
        dispatch({
            type: INFO_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getAdminInfos = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_INFOS_REQUEST })

        const { data } = await axios.get(`/api/v1/infos`)

        dispatch({
            type: ADMIN_INFOS_SUCCESS,
            payload: data.infos
        })

    } catch (error) {

        dispatch({
            type: ADMIN_INFOS_FAIL,
            payload: error.response.data.message
        })
    }
}



// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}  */
import axios from 'axios';

import {
    ALL_INFOS_REQUEST,
    ALL_INFOS_SUCCESS,
    ALL_INFOS_FAIL,
    ADMIN_INFOS_REQUEST,
    ADMIN_INFOS_SUCCESS,
    ADMIN_INFOS_FAIL,
    NEW_INFO_REQUEST,
    NEW_INFO_SUCCESS,
    NEW_INFO_FAIL,
    DELETE_INFO_REQUEST,
    DELETE_INFO_SUCCESS,
    DELETE_INFO_FAIL,
    UPDATE_INFO_REQUEST,
    UPDATE_INFO_SUCCESS,
    UPDATE_INFO_FAIL,
    INFO_DETAILS_REQUEST,
    INFO_DETAILS_SUCCESS,
    INFO_DETAILS_FAIL,

    CLEAR_ERRORS

} from '../constants/infoConstants'

export const getInfos = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_INFOS_REQUEST })

        let link = `/api/v1/OFFERs?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/v1/OFFERs?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_INFOS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_INFOS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newInfo = (infoData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_INFO_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

			const { data } = await axios.post(`/api/v1/admin/info/new`, JSON.stringify(infoData), config)

        dispatch({
            type: NEW_INFO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_INFO_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete INFO (Admin)
export const deleteInfo = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_INFO_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/info/${id}`)

        dispatch({
            type: DELETE_INFO_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_INFO_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update OFFER (ADMIN)
export const updateInfo = (id, infoData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_INFO_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/info/${id}`, JSON.stringify(infoData), config)

        dispatch({
            type: UPDATE_INFO_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_INFO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getInfoDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: INFO_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/infos/${id}`)

        dispatch({
            type: INFO_DETAILS_SUCCESS,
            payload: data.info
        })

    } catch (error) {
        dispatch({
            type: INFO_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminInfos = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_INFOS_REQUEST })

        const { data } = await axios.get(`/api/v1/infos`)

        dispatch({
            type: ADMIN_INFOS_SUCCESS,
            payload: data.infos
        })

    } catch (error) {

        dispatch({
            type: ADMIN_INFOS_FAIL,
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