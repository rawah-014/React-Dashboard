import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

export default ({ history, location }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard/overview');
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(phone, password));
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          {/*  <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p> */}
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">تسجيل الدخول لنطام المسلخ</h3>
                </div>
                <Form className="mt-4" onSubmit={submitHandler}>
                  <Form.Group id="phone" className="mb-4">
                    <Form.Label>الايميل</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="number"
                        id="phone_field"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="example@company.com"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>كلمة السر</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          id="password_field"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  {/*   <Card.Link
                    as={Link}
                    to={Routes.DashboardOverview.path}
                    className="text-gray-700"
                  > */}
                  <Button
                    variant="primary"
                    id="login_button"
                    type="submit"
                    className="w-100"
                  >
                    تسجيل الدخول
                  </Button>
                  {/*  </Card.Link> */}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
