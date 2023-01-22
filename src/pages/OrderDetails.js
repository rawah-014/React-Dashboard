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
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../constants/orderConstants";

//map
import HomeMap from "../components/HomeMap";
import { GoogleMap, Marker } from 'react-google-maps'




const OrderDetails = ({ match }) => {
  const [orderStatus, setOrderStatus] = useState("");

 

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    location
  } = order;
  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = match.params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, orderId]);

  const updateOrderHandler = (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
		const jsonData = Object.fromEntries(formData.entries());

    dispatch(updateOrder(order._id, jsonData));
  };



  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.phoneNo1}, ${shippingInfo.phoneNo2}`;

    const  locationDetails =
    location &&
    `${ location.latitude}, ${ location.longitude}`;
 

 
  return (
    <>
  
      {/* <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
            //  <HomeMap />    
            <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        >
            {location &&
                          location.map((location) => {
                return (
                    <Marker
                        key={location.id}
                        position={{
                            lat: location.latitude,
                            lng: location.longitude
                        }}
                    />
                )
            })}
        </GoogleMap>
        
        </Col>
      </Row>  */}

<Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
             <HomeMap />    
            
        
        </Col>
      </Row> 
      <Card border="light" className="shadow-sm">
        <Card.Body className="">
          <div className="row">
            <div className="col-10 col-md-2"></div>

            <div className="col-12 col-md-10">
      
              <Fragment>
                {loading ? (
                  <Loader />
                ) : (
                  <div className="row d-flex justify-content-around">
                  <div className="col-12 col-lg-7 order-details">
                    <h2 className="my-5">تفاصيل الطلب {order.num}</h2>
                        {/* test   {item.latitude}   {item.longitude}   */}
                        <div className="cart-item my-1">
                        {location &&
                          location.map((item) => (
                            <div>
                              <div  className="row ">
                              <h4 className="my-4">المستخدم</h4>
                              <p className="col-5 col-lg-5">
                                  {item.latitude}      
                              </p>
                            </div>
                            <div  className="row ">
                              <h4 className="my-4">العنوان</h4>
                              <p className="col-5 col-lg-5">
                                  {item.longitude}      
                              </p>
                            </div>
                          
                            </div>
                          ))}
                      </div>
                       {/* test */}
                    <h4 className="mb-4">معلومات الطلب</h4>
                    {/* test */}
                    <div className="cart-item my-1">
                        {shippingInfo &&
                          shippingInfo.map((item) => (
                            <div>
                              <div  className="row ">
                              <h4 className="my-4">المستخدم</h4>
                              <p className="col-5 col-lg-5">
                                  {item.userName}      
                              </p>
                            </div>
                            <div  className="row ">
                              <h4 className="my-4">العنوان</h4>
                              <p className="col-5 col-lg-5">
                                  {item.address}      
                              </p>
                            </div>
                            <div  className="row ">
                              <h4 className="my-4">الهاتف</h4>
                              <p className="col-5 col-lg-5">
                                  {item.phoneNo1}      
                              </p>
                            </div>
                            <div  className="row">
                              <h4 className="my-4">رقم هاتف اخر</h4>
                              <p className="col-5 col-lg-5">
                                  {item.phoneNo2}      
                              </p>
                            </div>
                            </div>
                          ))}
                      </div>
                       {/* test */}
                   

                    <hr />
                

                      <h4 className="my-4">حالة الطلب</h4>
                      <p
                     
                      >
                        <b>{order.orderStatus}</b>
                      </p>
                  

                      <h4 className="my-4">تفاصيل المنتج المطلوب :</h4>

                      <hr />
               
                      <div className="cart-item my-1">
                        {orderItems &&
                          orderItems.map((item) => (
                            <div key={item.product} className="row my-5">
                              <h4 className="my-4">اسم المنتج</h4>
                        
                              <div className="col-5 col-lg-5">
                                <Link to={`/products/${item.product}`}>
                                  {item.name}
                                </Link>
                              </div>

                         
                              <h4 className="my-4">الرأس</h4>

                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>{item.head}</p>
                              </div>
                              <h4 className="my-4">الاحشاء</h4>

                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>{item.bowls}</p>
                              </div>
                              <h4 className="my-4">الوزن</h4>
                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>{item.weight}</p>
                              </div>
                              <h4 className="my-4">سعر الرأس</h4>
                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>{item.headPrice}</p>
                              </div>
                              <h4 className="my-4">سعر الوزن</h4>
                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>{item.weightPrice}</p>
                              </div>
                              <h4 className="my-4">سعر الاحشاء</h4>
                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>{item.bowelsPrice}</p>
                              </div>
                              <h4 className="my-4">الكمية</h4>
                              <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <p>{item.quantity} Piece(s)</p>
                              </div>
                              <h4 className="my-4">السعر كامل</h4>
                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>{item.totalPrice}</p>
                              </div>
                           
                            </div>
                          ))}
                      </div>
                      <hr />
                    </div>

                    <div className="col-12 col-lg-3 mt-5">
                      <h4 className="my-4">حالة الطلب</h4>
                        <form  onSubmit={updateOrderHandler}>
                      <div className="form-group">
                        <select
                          className="form-control"
                          id="_field"
                          name="orderStatus"
                          value={orderStatus}
                          onChange={(e) => setOrderStatus(e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                       
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>

                      <button
                        className="btn btn-primary btn-block" type="submit"
                       
                      >
                        تحديث حالة الطلب
                      </button>
                      </form>
                    </div>

          

                  </div>
                )}
              </Fragment>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderDetails;

