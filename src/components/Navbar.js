
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../routes";
import {
  Card 
} from "@themesberg/react-bootstrap";

import NOTIFICATIONS_DATA from "../data/notifications";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../actions/userActions";


export default () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  
  };



  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0 bg-">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">

          <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700"   onClick={logoutHandler}>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
          </Card.Link>
          </div>
          <Nav className="align-items-center">
           

            
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
