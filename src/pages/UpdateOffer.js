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
import { updateOffer, getOfferDetails, clearErrors } from '../actions/offerActions'
import { UPDATE_OFFER_RESET } from '../constants/offerConstants'

const UpdateOffer = ({ match, history }) => {

    const [off, setOff] = useState("");
    
   


    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, offer } = useSelector(state => state.offerDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.offer);

    const offerId = match.params.id;

    useEffect(() => {

        if (offer && offer._id !== offerId) {
            dispatch(getOfferDetails(offerId));
        } else {
            setOff(offer.off);
           
          
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
            history.push('/admin/offers');
            alert.success('offer updated successfully');
            dispatch({ type: UPDATE_OFFER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, offer, offerId])


    const submitHandler = (e) => {
        e.preventDefault();

        var FormData = require("form-data");
    
        const formData = new FormData(e.target);
        const jsonData = Object.fromEntries(formData.entries());
        dispatch(updateOffer(offer._id, jsonData))
    }




    return (
        <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Row>
          <Col xs={12} xl={10}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">تحديث العرض</h5>
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
                          placeholder="أدخل اسم العرض"
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
    )
}

export default UpdateOffer
