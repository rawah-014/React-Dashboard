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

import { REGISTER_USER_RESET } from "../constants/userConstants";
import { register, clearErrors } from '../actions/userActions'

const NewUser = ({ history }) => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading  } = useSelector(state => state.auth);

  useEffect(() => {
  
      if (isAuthenticated) {
        alert.success("user created successfully");
          history.push('/register')
          
      }
  
      if (error) {
          alert.error(error);
          dispatch(clearErrors());
      }
  
  }, [dispatch, alert, isAuthenticated, error, history])

  const submitHandler = (e) => {
    e.preventDefault();

    var FormData = require("form-data");

    const formData = new FormData(e.target);
		const jsonData = Object.fromEntries(formData.entries());

		dispatch(register(jsonData));
  };

 /*  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confPassword:'',
    phone:'',
    phone2:'',
    role:'',

})

const { name, email, password ,confPassword,phone,phone2 ,role} = user;


const alert = useAlert();
const dispatch = useDispatch();

const { isAuthenticated, error, loading } = useSelector(state => state.auth);

useEffect(() => {

    if (isAuthenticated) {
        history.push('/settings')
    }

    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }

}, [dispatch, alert, isAuthenticated, error, history])

const submitHandler = (e) => {
    e.preventDefault();

  /*   const formData = new FormData();
     formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('confPassword', confPassword);
    formData.set('phone', phone);
    formData.set('phone2', phone2);
    formData.set('role', role); *
   

   // dispatch(register(formData)) 
     const formData = new FormData();
    const jsonData = Object.fromEntries(formData.entries());

    dispatch(register(jsonData)); 
}
const onChange = e => {
 
      setUser({ ...user, [e.target.name]: e.target.value })
  
} */



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
                          required
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
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>كلمة السر</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          id="password_field"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          placeholder="أعد ادخال كلمة السر"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>تأكيد كلمة السر</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          id="confPassword_field"
                          name="confPassword"
                          onChange={(e) => setConfPassword(e.target.value)}
                          value={confPassword}
                          placeholder="أعد ادخال كلمة السر"
                        />
                      </Form.Group>
                    </Col>
                  </Row>


                  <div className="mt-3">
                    <Button
                      variant="primary"
                      id="login_button"
                      type="submit"
                    
                    >
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

export default NewUser;
