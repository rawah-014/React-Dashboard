import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loader from '../components/layout/Loader'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser, clearErrors } from '../actions/userActions'
import { DELETE_USER_RESET } from '../constants/userConstants'

const UsersList = ({ history }) => { 

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('User deleted successfully');
            history.push('/upgrade');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                // {
                //     label: 'User ID',
                //     field: 'id',
                //     sort: 'asc'
                // },
                {
                    label: 'الاسم',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'الايميل',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'رقم الهاتف',
                    field: 'phone',
                    sort: 'asc'
                },
                {
                    label: 'رقم هاتف اخر',
                    field: 'phone2',
                    sort: 'asc'
                },
                {
                    label: 'نوع المستخدم',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'ادارة',
                    field: 'actions',
                },
            ],
            rows: []
        }
        
      /*   <Form onSubmit={submitHandler} encType="multipart/form-data">
        {users &&
            users.map((user) => ((
                
                     <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>نوع المستخدم</Form.Label>
                        <Form.Select
                          defaultValue="user"
                          id="role_field"
                          className="form-control"
                          name="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="user">مستخدم</option>
                          <option value="admin">أدمن</option>
                          <option value="driver">سائق</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3"></Col>
                  </Row>
              
            )}
            </Form> */

        users.forEach(user => {
            data.rows.push({
                // id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                phone2: user.phone2,
                role: user.role,

                actions: <Fragment >
                     <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-1 ms-4">
                       تحديث
                    </Link> 
                    <button className="btn btn-sm btn-danger py-1 px-1 ml-2" onClick={() => deleteUserHandler(user._id)}>
                       مسح
                    </button>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
           
            <div className="row">
                <div className="col-12 col-md-2">
                
                </div>

                <div className="col-12 col-md-10">
                    <Fragment className="container">
                        <h5 className="my-5">المستخدمين</h5>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="container bg-white pt-5"
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

export default UsersList
