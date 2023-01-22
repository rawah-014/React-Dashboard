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
import { newInfo, clearErrors } from "../actions/infoActions";
import { NEW_INFO_RESET  } from "../constants/infoConstants";

const AddInfo = ({ history }) => {
  const [kssEmail, setKssEmail] = useState("");
  const [kssPhone, setKssPhone] = useState("");
  const [bokNumber, setBokNumber] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newInfo);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/infos");
      alert.success("Infos created successfully");
      dispatch({ type: NEW_INFO_RESET  });
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    var FormData = require("form-data");

    const formData = new FormData(e.target);
		const jsonData = Object.fromEntries(formData.entries());

		dispatch(newInfo(jsonData));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Row>
          <Col xs={12} xl={10}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">اضافة معلومات التواصل</h5>
                <Form onSubmit={submitHandler} encType="multipart/form-data">
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>الايميل</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setKssEmail(e.target.value)}
                          id="kssEmail_field"
                          name="kssEmail"
                          value={kssEmail}
                          placeholder="ادخل البريد الالكتروني"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                    <Form.Group>
                        <Form.Label>رقم الهاتف</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          id="kssPhone_field"
                          name="kssPhone"
                          onChange={(e) => setKssPhone(e.target.value)}
                          value={kssPhone}
                          placeholder="ادخل رقم الهاتف"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>حساب البنك</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          id="bokNumber_field"
                          name="bokNumber"
                          onChange={(e) => setBokNumber(e.target.value)}
                          value={bokNumber}
                          placeholder="ادخل حساب البنك"
                        />
                      </Form.Group>
                    </Col>
                 
                  </Row>

                 {/*  <h5 className="my-4">الاسعار و اﻷوزان</h5>
                  <Row>
                    <Col sm={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>الوزن الصغير</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          id="smallWeight_field"
                          name="smallWeight"
                          onChange={(e) => setSmallWeight(e.target.value)}
                          value={smallWeight}
                          placeholder="  ادحل الوزن"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>سعر الوزن الصغير</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          id="smallPrice_field"
                          name="smallPrice"
                          onChange={(e) => setSmallPrice(e.target.value)}
                          value={smallPrice}
                          placeholder="السعر كامل يشمل الرأس و اﻷحشاء"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>الوزن المتوسط</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          id="mediumWeight_field"
                          name="mediumWeight"
                          onChange={(e) => setMediumWeight(e.target.value)}
                          value={mediumWeight}
                          placeholder="  ادحل الوزن"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>سعر الوزن المتوسط</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          id="mediumPrice_field"
                          name="mediumPrice"
                          onChange={(e) => setMediumPrice(e.target.value)}
                          value={mediumPrice}
                          placeholder="السعر كامل يشمل الرأس و اﻷحشاء"
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>الوزن الكبير</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          id="largWeight_field"
                          name="largWeight"
                          onChange={(e) => setLargWeight(e.target.value)}
                          value={largWeight}
                          placeholder="  ادحل الوزن"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>سعر الوزن الكبير</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          id="largPrice_field"
                          name="largPrice"
                          onChange={(e) => setLargPrice(e.target.value)}
                          value={largPrice}
                          placeholder="السعر كامل يشمل الرأس و اﻷحشاء"
                        />
                      </Form.Group>
                    </Col>
                  </Row> */}

                  <div className="mt-3">
                    <Button
                      variant="primary"
                      id="login_button"
                      type="submit"
                      disabled={loading ? true : false}
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


export default AddInfo;
