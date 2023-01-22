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
import { newProduct, clearErrors } from "../actions/productActions";
import { NEW_PRODUCT_RESET  } from "../constants/productConstants";

const NewProduct = ({ history }) => {
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
    formData.set("name", name);
    formData.set("mainCategory", mainCategory);
    formData.set("smallPrice", smallPrice);
    formData.set("headPrice", headPrice);
    formData.set("bowelsPrice", bowelsPrice);
    formData.set("smallWeight", smallWeight);
    formData.set("mediumWeight", mediumWeight);
    formData.set("mediumPrice", mediumPrice);
    formData.set("largWeight", largWeight);
    formData.set("largPrice", largPrice);
    formData.append("testImage", testImage);
     /*  formData.append("testImage", testImage) */
  
    

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

 
} */

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
                         
                          id="mainCategory_field"
                          name="mainCategory"
                          
                          onChange={(e) => setMainCategory(e.target.value)}
                          value={mainCategory}
                        >
                          <option value="one">بقر</option>
                          <option value="two">خراف</option>
                          <option value="three">ابل</option>
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
                    <input type="file" onChange={handleFileSelect}/>
                  {/*   <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>الصورة</Form.Label>
                        <Form.Control
                          
                          type="file"
                          id="testImage_field"
                          name="testImage"
                          onChange={onChange}
                          value={testImage}
                          placeholder="السعر كامل يشمل الرأس و اﻷحشاء"
                        />
                      </Form.Group>
                    </Col>  */}
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

                                </div> */}
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

export default NewProduct;