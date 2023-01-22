import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Loader from '../components/layout/Loader'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, deleteProduct, clearErrors } from '../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../constants/productConstants'

const ProductsList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { products ,loading, error } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Product deleted successfully');
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setProducts = () => {
        const data = {
            columns: [
                // {
                //     label: 'ID',
                //     field: 'id',
                //     sort: 'asc'
                // },
                {
                    label: 'اسم المنتج',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'نسبة الرأس',
                    field: 'headPrice',
                    sort: 'asc'
                },
                {
                    label: 'نسبة اﻷحشا',
                    field: 'bowelsPrice',
                    sort: 'asc'
                },
                {
                    label: 'الوزن الصغير',
                    field: 'smallWeight',
                },
                {
                    label: 'سعر الصغير',
                    field: 'smallPrice',
                },
                {
                    label: 'الوزن المتوسط',
                    field: 'mediumWeight',
                },
                {
                    label: 'سعر المتوسط',
                    field: 'mediumPrice',
                },
                {
                    label: 'الوزن الكبير',
                    field: 'largWeight',
                },
                {
                    label: 'سعر الكبير',
                    field: 'largPrice',
                },
                {
                    label: 'ادارة',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                 id: product._id,
                name: product.name,
                headPrice: product.headPrice,
                bowelsPrice: product.bowelsPrice,
                smallWeight: product.smallWeight,
                smallPrice: product.smallPrice,
                mediumPrice: product.mediumPrice,
                mediumWeight: product.mediumWeight,
                largPrice: product.largPrice,
                largWeight: product.largWeight,
                actions: <Fragment>
                     <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2 ms-4">
                       تحديث
                    </Link> 
                    <button className="btn btn-sm btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        مسح
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <Fragment>
           
            <div className="row">
                <div className="col-12 col-md-2">
                 
                </div>

                <div className="col-12 col-md-10">
                    <Fragment className="container">
                        <h5 className="my-5">قائمة المنتجات</h5>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3 bg-white pt-5 container"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductsList
