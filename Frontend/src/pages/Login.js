import React, {useEffect} from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { message } from 'antd';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (value) => {
        try {
            dispatch({
              type: "SHOW_LOADING",
            });
            const res = await axios.post('/api/users/login',value);
            dispatch({ type: "HIDE_LOADING"});
            message.success("User Login Successfully");
            localStorage.setItem('auth', JSON.stringify(res.data));
            navigate('/')
          } catch (error) {
            dispatch({ type: "HIDE_LOADING"});
            message.error("Something Went Wrong!!");
            console.group(error);
          }
    }
    //current login user
    useEffect(() => {
        if(localStorage.getItem('auth')){
            localStorage.getItem('auth')
            navigate('/')
        }
    },[navigate])
    return (
        <>
            <div className='register' >

                <div className='registration-form'>
                    <h1>POS App</h1>
                    <h3>Login Page</h3>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item name="userName" label="Username:">
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item name="password" label="Password:">
                            <Input autoComplete="off" type='password' />
                        </Form.Item>
                        <div className='d-flex justify-content-between'>
                            <p>
                            Don't have an account?
                                <Link to="/register" style={{ textDecoration: "none" }}> Sign up</Link>
                            </p>
                            <Button type="primary" htmlType='submit'>
                                Log in
                            </Button>
                        </div>
                    </Form>
                </div>

            </div>
        </>
    )
}

export default Login
