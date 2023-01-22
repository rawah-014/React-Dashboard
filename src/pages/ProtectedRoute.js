import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import  { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
   
    return (
        <Fragment>
            {loading === false && (
                 <Route {...rest} render={props => (
                    <>
                    
                     
                      <Sidebar />
              
                      <main className="content">
                        <Navbar />
                    
                        <Component {...props} />
               
                      </main>
                     
                    </>
                  )}
                  />
            )}
        </Fragment>
    )
}

export default ProtectedRoute
