/* import React, { Fragment, useState, useEffect } from "react";

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
import { newProduct, clearErrors } from "../actions/productActions";
import { NEW_PRODUCT_RESET  } from "../constants/productConstants";

const NewImage = ({ history }) => {
 
  const [testImage, setTestImage] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin/product");
      alert.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET  });
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    var FormData = require("form-data");

    const formData = new FormData();
  
   
      formData.append("testImage", testImage) 
  
    

    dispatch(newProduct(formData));
  };

  
  const handleFileSelect = (event) => {
    setTestImage(event.target.files[0])
  }
  /* const onChange = e => {

    const files = Array.from(e.target.files) 
    
    setImagesPreview([]);
    setTestImage([])

    files.forEach(file => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagesPreview(oldArray => [...oldArray, reader.result])
                setTestImage(oldArray => [...oldArray, reader.result])
            }
        }

        reader.readAsDataURL(file)
    })

 
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
                        <Form.Label>الصورة</Form.Label>
                        <Form.Control
                          required
                          type="file"
                          id="testImage_field"
                          name="testImage"
                          onChange={handleFileSelect}
                          value={testImage}
                          placeholder="السعر كامل يشمل الرأس و اﻷحشاء"
                        />
                      </Form.Group>
                    </Col>  
                   {/*   <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='testImage'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                     </label>
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div> *
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

export default NewImage; */


import React from 'react';
import axios from 'axios';

const NewImage = () => {
  // a local state to store the currently selected file.
  const [testImage, setTestImage] = React.useState(null);

  const handleSubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("testImage", testImage);
    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/admin/product/new",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setTestImage(event.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form>
  )
};

export default NewImage;