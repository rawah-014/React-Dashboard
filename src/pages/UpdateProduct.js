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
import { updateProduct, getProductDetails, clearErrors } from '../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../constants/productConstants'

const UpdateProduct = ({ match, history }) => {

    const [name, setName] = useState("");
    const [mainCategory, setMainCategory] = useState("");
    const [smallPrice, setSmallPrice] = useState("");
    const [headPrice, setHeadPrice] = useState("");
    const [bowelsPrice, setBowelsPrice] = useState("");
    const [smallWeight, setSmallWeight] = useState("");
    const [mediumWeight, setMediumWeight] = useState("");
    const [mediumPrice, setMediumPrice] = useState("");
    const [largWeight, setLargWeight] = useState("");
    const [largPrice, setLargPrice] = useState("");
   


    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);

    const productId = match.params.id;

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setMainCategory(product.mainCategory);
            setSmallPrice(product.smallPrice);
            setHeadPrice(product.headPrice);
            setBowelsPrice(product.bowelsPrice);
            setSmallWeight(product.setSmallWeight);
            setMediumWeight(product.mediumWeight);
            setMediumPrice(product.setMediumPrice);
            setLargWeight(product.largWeight);
            setLargPrice(product.largPrice)
          
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
            history.push('/admin/products');
            alert.success('Product updated successfully');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, product, productId])


    const submitHandler = (e) => {
        e.preventDefault();

        var FormData = require("form-data");
    
        const formData = new FormData(e.target);
        const jsonData = Object.fromEntries(formData.entries());
        dispatch(updateProduct(product._id, jsonData))
    }




    return (
        <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Row>
          <Col xs={12} xl={10}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">اضافة منتج</h5>
                <Form onSubmit={submitHandler} encType="multipart/form-data">
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>اسم المنتج</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          id="name_field"
                          name="name"
                          value={name}
                          placeholder="أدخل اسم المنتج"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>الفئة</Form.Label>
                        <Form.Select
                          defaultValue="one"
                          id="mainCategory_field"
                          name="mainCategory"
                          
                          onChange={(e) => setMainCategory(e.target.value)}
                          value={mainCategory}
                        >
                          <option value="one">ابل</option>
                          <option value="two">بقر</option>
                          <option value="three">خروف</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>نسبة الاحشاء</Form.Label>
                        <Form.Control
                          
                          type="number"
                          id="bowelsPrice_field"
                          name="bowelsPrice"
                          onChange={(e) => setBowelsPrice(e.target.value)}
                          value={bowelsPrice}
                          placeholder="ادخل النسبة التي تساويها الاحشاء"
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>نسبة الرأس</Form.Label>
                        <Form.Control
                          
                          type="number"
                          id="headPrice_field"
                          name="headPrice"
                          onChange={(e) => setHeadPrice(e.target.value)}
                          value={headPrice}
                          placeholder="ادخل النسبة التي يساويها الرأس "
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="my-4">الاسعار و اﻷوزان</h5>
                  <Row>
                    <Col sm={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>الوزن الصغير</Form.Label>
                        <Form.Control
                          
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
                          
                          type="number"
                          id="largPrice_field"
                          name="largPrice"
                          onChange={(e) => setLargPrice(e.target.value)}
                          value={largPrice}
                          placeholder="السعر كامل يشمل الرأس و اﻷحشاء"
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

export default UpdateProduct
