import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Loader from '../components/layout/Loader'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminOffers, deleteOffer, clearErrors } from '../actions/offerActions'
import { DELETE_OFFER_RESET } from '../constants/offerConstants'

const OffersList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { offers ,loading, error } = useSelector(state => state.offers);
    const { error: deleteError, isDeleted } = useSelector(state => state.offer)

    useEffect(() => {
        dispatch(getAdminOffers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Offer deleted successfully');
            history.push('/admin/offers');
            dispatch({ type: DELETE_OFFER_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setOffers = () => {
        const data = {
            columns: [
                // {
                //     label: 'ID',
                //     field: 'id',
                //     sort: 'asc'
                // },
                {
                    label: 'اسم العرض',
                    field: 'off',
                    sort: 'asc'
                },
                {
                    label: 'ادارة',
                    field: 'actions',
                },
               
            ],
            rows: []
        }

        offers.forEach(offer => {
            data.rows.push({
                 id: offer._id,
                off: offer.off,
              
                actions: <Fragment>
                     <Link to={`/admin/offer/${offer._id}`} className="btn btn-primary py-1 px-2 ms-4">
                       تحديث
                    </Link> 
                    <button className="btn btn-sm btn-danger py-1 px-2 ml-2" onClick={() => deleteOfferHandler(offer._id)}>
                        مسح
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteOfferHandler = (id) => {
        dispatch(deleteOffer(id))
    }

    return (
        <Fragment>
           
            <div className="row">
                <div className="col-12 col-md-2">
                 
                </div>

                <div className="col-12 col-md-10">
                    <Fragment className="container">
                        <h5 className="my-5">قائمة العروض</h5>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOffers()}
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

export default OffersList
