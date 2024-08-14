import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (value) => {
        try {
            dispatch({
                type: "SHOW_LOADING",
            });
            await axios.post('/api/users/register', value);
            dispatch({
                type: "HIDE_LOADING",
            });
            message.success("Register Successfully");
            navigate('/login');
        } catch (error) {
            dispatch({
                type: "HIDE_LOADING",
            });
            message.error("Something Went Wrong!!");
            console.group(error);
        }
    }

    //current registered user
    useEffect(() => {
        if(localStorage.getItem('auth')){
            localStorage.getItem('auth')
            navigate('/')
        }
    }, [navigate])
    return (
        <>
            <div className='register' >

                <div className='registration-form'>
                    <h1>POS App</h1>
                    <h3>Registration Page</h3>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item name="name" label="Name:">
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item name="userName" label="Username:">
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item name="password" label="Password:">
                            <Input autoComplete="off" type='password' />
                        </Form.Item>
                        <div className='d-flex justify-content-between'>
                            <p>
                                Have an account?
                                <Link to="/login" style={{ textDecoration: "none" }}> Log in</Link>
                            </p>
                            <Button type="primary" htmlType='submit'>
                                Register
                            </Button>
                        </div>
                    </Form>
                </div>

            </div>
        </>
    )
}

export default Register
