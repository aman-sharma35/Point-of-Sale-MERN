import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Button, Table, Form, Input, Select, message } from 'antd';


const ItemPages = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setpopupModal] = useState(false);
  const [editItem, seteditItem] = useState(null);

  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      })
      const { data } = await axios.get('/api/items/get-item')
      setItemsData(data);
      dispatch({
        type: "HIDE_LOADING",
      })
      console.log(data);
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  }

  // useEffect
  useEffect(() => {
    getAllItems()
    // eslint-disable-next-line
  }, []);

  //Handle Delete
  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post('/api/items/delete-item', { itemId: record._id });
      message.success("Item Deleted Successfully");
      getAllItems();
      setpopupModal(false);
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Something Went Wrong!!");
      console.group(error);
    }
  }

  //Table Data
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
      title: 'Actions',
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              seteditItem(record);
              setpopupModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleDelete(record)
            }}
          />

        </div>
      )
    }
  ];

  // handle form submit
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.post('/api/items/add-item', value);
        message.success("Item Added Successfully");
        getAllItems();
        setpopupModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        message.error("Something Went Wrong!!");
        console.group(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put('/api/items/edit-item', { ...value, itemId: editItem._id });
        message.success("Item Updated Successfully");
        getAllItems();
        setpopupModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        message.error("Something Went Wrong!! Please try again.");
        console.group(error);
      }
    }
  }

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setpopupModal(true)}>
          Add Items
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />
      {
        popupModal && (
          <Modal
            title={`${editItem !== null ? 'Edit Item ' : 'Add New Item'}`}
            open={popupModal}
            onCancel={() => {
              seteditItem(null);
              setpopupModal(false)
            }}
            footer={false}
          >
            <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
              <Form.Item name="name" label="Name:">
                <Input autocomplete="off"/>
              </Form.Item>
              <Form.Item name="image" label="Image URL:">
                <Input autocomplete="off"/>
              </Form.Item>
              <Form.Item name="price" label="Price:">
                <Input autocomplete="off"/>
              </Form.Item>
              <Form.Item name="category" label="Category:">
                <Select>
                  <Select.Option value="drinks">Drinks</Select.Option>
                  <Select.Option value="rice">Rice</Select.Option>
                  <Select.Option value="noodles">Noodles</Select.Option>
                </Select>
              </Form.Item>
              <div className='d-flex justify-content-end'>
                <Button type="primary" htmlType='submit'>
                  Save
                </Button>
              </div>
            </Form>
          </Modal>
        )
      }
    </DefaultLayout>
  )
}

export default ItemPages;
