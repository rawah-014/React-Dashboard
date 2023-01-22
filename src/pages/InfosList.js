import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Loader from '../components/layout/Loader'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminInfos, deleteInfo, clearErrors } from '../actions/infoActions'
import { DELETE_INFO_RESET } from '../constants/infoConstants'


const InfosList = ({ history }) => {

    const alert = useAlert(); 
    const dispatch = useDispatch();

    const { infos ,loading, error } = useSelector(state => state.infos);
    const { error: deleteError, isDeleted } = useSelector(state => state.infos) 

    useEffect(() => {
        dispatch(getAdminInfos());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

         if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Infos deleted successfully');
            history.push('/infos');
            dispatch({ type: DELETE_INFO_RESET })
        } 

    }, [dispatch, alert, error,  deleteError, isDeleted,  history])

    const setInfos = () => {
        const data = {
            columns: [
                // {
                //     label: 'ID',
                //     field: 'id',
                //     sort: 'asc'
                // },
                {
                    label: 'رقم الهاتف',
                    field: 'kssPhone',
                    sort: 'asc'
                },
                {
                    label: 'الايميل',
                    field: 'kssEmail',
                    sort: 'asc'
                },
                {
                    label: 'حساب البنك',
                    field: 'bokNumber',
                    sort: 'asc'
                },
               
                {
                    label: 'ادارة',
                    field: 'actions',
                },
            ],
            rows: []
        }

        infos.forEach(info => {
            data.rows.push({
                 id: info._id,
                 kssPhone: info.kssPhone,
                 kssEmail: info.kssEmail,
                 bokNumber: info.bokNumber,
                actions: <Fragment>
                     <Link to={`/admin/info/${info._id}`} className="btn btn-primary py-1 px-2 ms-4">
                       تحديث
                    </Link> 
                  {/*   <button className="btn btn-sm btn-danger py-1 px-2 ml-2" onClick={() => deleteInfosHandler(info._id)}>
                        مسح
                    </button> */}
                </Fragment>
            })
        })

        return data;
    }

    const deleteInfosHandler = (id) => {
        dispatch(deleteInfo(id))
    }

    return (
        <Fragment>
           
            <div className="row ">
                <div className="col-12 col-md-2">
                 
                </div>

                <div className="col-12 col-md-10 ">
                    <Fragment className="container ">
                        <h5 className="my-5">قائمة معلومات التواصل</h5>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setInfos()}
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

export default InfosList
