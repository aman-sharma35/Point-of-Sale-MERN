import React from 'react'
import DefaultLayout from './../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';

const Cart = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.rootReducer);


    // handle increment
    const handleIncrement = (record) => {
        dispatch({
            type: "UPDATE_CART",
            payload: { ...record, quantity: record.quantity + 1 }
        });
    }
    // handle decrement
    const handleDecrement = (record) => {
        if (record.quantity !== 1) {
            dispatch({
                type: "UPDATE_CART",
                payload: { ...record, quantity: record.quantity - 1 }
            });
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image, record) => <img src={image} alt={record.name} height="60" width="60" />// render: antd me use hota hai
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: '_id',
            render: (id, record) => (
                <div>
                    <MinusCircleOutlined className='mx-3' style={{ cursor: 'pointer' }} onClick={() => handleDecrement(record)} />
                    <b>{record.quantity}</b>
                    <PlusCircleOutlined className='mx-3' style={{ cursor: 'pointer' }} onClick={() => handleIncrement(record)} />
                </div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: "_id",
            render: (id, record) => (
                <DeleteOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={() => dispatch({
                        type: "DELETE_FROM_CART",
                        payload: record,
                    })}
                />
            )
        }
    ]
    return (
        <DefaultLayout>
            <Table columns={columns} dataSource={cartItems} bordered />
        </DefaultLayout>
    )
}

export default Cart
