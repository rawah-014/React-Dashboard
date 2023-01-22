import React, { Fragment, useState, useEffect } from 'react'

import {
    Col,
    Row,
    Card,
    Form,
    Button,
    InputGroup,
  } from "@themesberg/react-bootstrap";

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateInfo, getInfoDetails, clearErrors } from '../actions/infoActions'
import { UPDATE_INFO_RESET } from '../constants/infoConstants'

const UpdateInfo = ({ match, history }) => {

    const [kssEmail, setKssEmail] = useState("");
  const [kssPhone, setKssPhone] = useState("");
  const [bokNumber, setBokNumber] = useState("");
    
   


    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, info } = useSelector(state => state.infoDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.info);

    const infoId = match.params.id;

    useEffect(() => {

        if (info && info._id !== infoId) {
            dispatch(getInfoDetails(infoId));
        } else {
            setKssEmail(info.kssEmail);
            setKssPhone(info.kssPhone);
            setBokNumber(info.bokNumber);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            history.push('/infos');
            alert.success('info updated successfully');
            dispatch({ type: UPDATE_INFO_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, info, infoId])


    const submitHandler = (e) => {
        e.preventDefault();

        var FormData = require("form-data");
    
        const formData = new FormData(e.target);
        const jsonData = Object.fromEntries(formData.entries());
        dispatch(updateInfo(info._id, jsonData))
    }




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
    )
}

export default UpdateInfo
