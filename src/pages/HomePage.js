import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages

import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import ListOrders from "./ListOrders";
import ProductTable from "./ProductTable";
import UpdateUser from "./UpdateUser";
import Signin from "./examples/Signin";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
import UpdateProduct from "./UpdateProduct";
import NewProduct from "./NewProduct";
import NewUser from "./NewUser";
import ProductsList from "./ProductsList";
import AddInfo from "./AddInfo";
import InfosList from "./InfosList";



// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";



import OrderDetails from './OrderDetails';
import NewOffer from './NewOffer';
import OffersList from './OffersList';
import UpdateOffer from './UpdateOffer';

import NewDelivery from './NewDelivery';

//login
import ProtectedRoute from './ProtectedRoute'
import { loadUser } from '../actions/userActions'
import { useSelector } from 'react-redux'
import store from '../store'
import axios from 'axios'
import UpdateInfo from './UpdateInfo';
import NewImage from './NewImage';


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} />  <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);


//login



/* const { user, isAuthenticated, loading } = useSelector(state => state.auth) */

  return (
    <Route {...rest} render={props => (
      <>
      
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
      
          <Component {...props} />
 
        </main>
       
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    
   {/* RouteWithSidebar <ProtectedRoute exact path={Routes.DashboardOverview.path} isAdmin={true} component={DashboardOverview} />
 */}
    <ProtectedRoute exact path={Routes.DashboardOverview.path} isAdmin={true} component={DashboardOverview} />
    <ProtectedRoute exact path={Routes.Upgrade.path} isAdmin={true} component={Upgrade} />
    <ProtectedRoute exact path={Routes.ListOrders.path} isAdmin={true} component={ListOrders} />
    <ProtectedRoute exact path={Routes.ProductTable.path} isAdmin={true} component={ProductTable} />
    <ProtectedRoute exact path={Routes.UpdateUser.path} isAdmin={true} component={UpdateUser} />
    <ProtectedRoute exact path={Routes.NewProduct.path} isAdmin={true} component={NewProduct} />
    <ProtectedRoute exact path={Routes.NewImage.path} isAdmin={true} component={NewImage} />
    <ProtectedRoute exact path={Routes.NewUser.path} isAdmin={true} component={NewUser} />
    <ProtectedRoute exact path={Routes.ProductsList.path} isAdmin={true} component={ProductsList} />
    <ProtectedRoute exact path={Routes.AddInfo.path} isAdmin={true} component={AddInfo} />
    <ProtectedRoute exact path={Routes.InfosList.path} isAdmin={true} component={InfosList} />
    <ProtectedRoute exact path={Routes.UpdateProduct.path} isAdmin={true} component={UpdateProduct} />
    <ProtectedRoute exact path={Routes.OrderDetails.path} isAdmin={true} component={OrderDetails} />
    <ProtectedRoute exact path={Routes.OffersList.path} isAdmin={true} component={OffersList} />
    <ProtectedRoute exact path={Routes.NewOffer.path} isAdmin={true}  component={NewOffer} />
    <ProtectedRoute exact path={Routes.NewDelivery.path} isAdmin={true}  component={NewDelivery} />
    <ProtectedRoute exact path={Routes.UpdateOffer.path}  isAdmin={true} component={UpdateOffer} />
    <ProtectedRoute exact path={Routes.UpdateInfo.path} isAdmin={true} component={UpdateInfo} />

    {/* components */}
   

  

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
