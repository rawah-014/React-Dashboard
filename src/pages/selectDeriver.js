import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loader from '../components/layout/Loader'
import {
    Col,
    Row,
    Card,
    Form,
    Button,
    InputGroup,
  } from "@themesberg/react-bootstrap";

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser, clearErrors } from '../actions/userActions'
import { DELETE_USER_RESET } from '../constants/userConstants'

const SelectDriver = ({ history }) => { 

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('User deleted successfully');
            history.push('/upgrade');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

  


    return (
       <>
                         

                       {
                        users.map(user => {
                            if(user.role === 'driver'){
                                return  <option value={user._id}>{user.name}</option>
                            }
                            
                        })
                       }

                         

       </>
    )
}

export default SelectDriver
