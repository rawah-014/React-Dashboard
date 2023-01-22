import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import MetaData from '../components/layout/MetaData'
import Loader from "../components/layout/Loader";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  ListGroup,
  ProgressBar,
  Form,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import {
  faCheck,
  faCog,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAlert } from "react-alert";

import { getOrderDetails } from "../actions/orderActions";

import { useDispatch, useSelector } from "react-redux";
import { newDelivery, clearErrors } from "../actions/deliveryActions";
import { NEW_DELIVERY_RESET } from "../constants/deliveryConstants";
import SelectDriver from "./selectDeriver";

const NewDelivery = ({ match }) => {
  const [orderid, setOrderid] = useState("");
  const [user, setUser] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  //order details

  const { order = {} } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, match.params.id]);

  ///////////////////////////////////////////////////////
  const { loading, error, success } = useSelector((state) => state.newDelivery);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product created successfully");
      dispatch({ type: NEW_DELIVERY_RESET });
    }
  }, [dispatch, alert, error, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    var FormData = require("form-data");

    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData.entries());

    dispatch(newDelivery(jsonData));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Row>
          <Col xs={12} xl={10}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">تحديد السائق</h5>
                <Form
                   onSubmit={submitHandler}  encType="multipart/form-data"
                >
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>رقم الطلب</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setOrderid(e.target.value)}
                          id="orderid_field"
                          name="orderid"
                          value={order._id}
                          placeholder="أدخل رقم الطلب"
                          
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>اسم السائق</Form.Label>
                        <Form.Select
                          type="text"
                          onChange={(e) => setUser(e.target.value)}
                          id="user_field"
                          name="user"
                          value={user}
                          placeholder="أدخل اسم المنتج"
                        >
                            <SelectDriver />
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="mt-3">
                    <Button variant="primary" id="login_button" type="submit">
                      حفظ
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NewDelivery;
