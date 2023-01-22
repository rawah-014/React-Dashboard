import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../actions/userActions";
import { UPDATE_USER_RESET } from "../constants/userConstants";

const UpdateUser = ({ history, match }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [role, setRole] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  const userId = match.params.id;

  useEffect(() => {
    console.log(user && user._id !== userId);
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setPhone2(user.phone2);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");

      history.push("/upgrade");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated, userId, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    var FormData = require("form-data");

    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData.entries());

    dispatch(updateUser(user._id, jsonData));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Row>
          <Col xs={12} xl={10}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">اضافة مستخدم</h5>
                <Form onSubmit={submitHandler} encType="multipart/form-data">
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>الاسم</Form.Label>
                        <Form.Control
                          
                          type="text"
                          id="name_field"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          placeholder="ادخل اسم المستخدم"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>الايميل</Form.Label>
                        <Form.Control
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          id="email_field"
                          name="email"
                          value={email}
                          placeholder="ادخل البريد الالكتروني"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>رقم الهاتف</Form.Label>
                        <Form.Control
                          
                          type="number"
                          id="phone_field"
                          name="phone"
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          placeholder="ادخل رقم الهاتف"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>رقم هاتف اضافي</Form.Label>
                        <Form.Control
                          
                          type="number"
                          id="phone2_field"
                          name="phone2"
                          onChange={(e) => setPhone2(e.target.value)}
                          value={phone2}
                          placeholder="ادخل رقم الهاتف"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>نوع المستخدم</Form.Label>
                        <Form.Select
                          defaultValue="user"
                          id="role_field"
                          className="form-control"
                          name="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="user">مستخدم</option>
                          <option value="admin">أدمن</option>
                          <option value="driver">سائق</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3"></Col>
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
    /*  <Fragment>
          
            <div className="row">
                <div className="col-12 col-md-2">
                  
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment> */
  );
};

export default UpdateUser;
