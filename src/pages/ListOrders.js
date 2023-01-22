import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

//import MetaData from '../components/layout/MetaData'
import Loader from '../components/layout/Loader'
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../actions/orderActions'
import { DELETE_ORDER_RESET } from '../constants/orderConstants'
 
const OrdersList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { orders,loading, error } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Order deleted successfully');
            history.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                 },
                {
                    label: 'التاريخ',
                    field: 'numofItems',
                    sort: 'asc'
                },
              /*   {
                    label: 'العنوان',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'المبلغ',
                    field: ' amount',
                }, */
               /*  {
                    label: 'رقم الهاتف',
                    field: 'actions',
                }, */
                {
                    label: 'حالة الطلب',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'ادارة',
                    field: 'actions',
                },
                {
                    label: 'اضافة سائق',
                    field: 'driver',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                 id: order.num,
                numofItems: order.createdAt,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <Fragment className="container">
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                       التفاصيل
                    </Link>
                 {/*    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button> */}
                </Fragment>,
                  driver:
                   <div className="container">
                  <Link to={`/admin/delivery/${order._id}`} className="btn btn-primary py-1 px-2">
                     تعيين
                  </Link>
              </div>
            })
        })

        return data;
    }


    return (
        <>
        <Row>
            <Col xs={12} xl={12} className="mb-4">
        <Card border="light" className="shadow-sm">
        <Card.Body className="">
          <div className="d-block">
            <h6 className="fw-normal text-gray mb-2">الطلبات</h6>
            

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
            </div>
      </Card.Body>
    </Card>
    </Col>
              </Row>
              </>
    )
}

export default OrdersList
