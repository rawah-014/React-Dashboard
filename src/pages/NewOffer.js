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
import { newOffer, clearErrors } from "../actions/offerActions";
import { NEW_OFFER_RESET  } from "../constants/offerConstants";

const NewOffer = ({ history }) => { 
  const [off, setOff] = useState("");
 

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newOffer);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin/offer");
      alert.success("Product created successfully");
      dispatch({ type: NEW_OFFER_RESET  });
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    var FormData = require("form-data");

    const formData = new FormData(e.target);
		const jsonData = Object.fromEntries(formData.entries());

		dispatch(newOffer(jsonData));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Row>
          <Col xs={12} xl={10}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">اضافة العروض</h5>
                <Form onSubmit={submitHandler} encType="multipart/form-data">
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>اسم العرض</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setOff(e.target.value)}
                          id="off_field"
                          name="off"
                          value={off}
                          placeholder="أدخل اسم المنتج"
                        />
                      </Form.Group>
                    </Col>
                   
                  </Row>

          
              

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

export default NewOffer;
