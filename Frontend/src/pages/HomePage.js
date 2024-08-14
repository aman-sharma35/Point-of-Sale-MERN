import React, {useEffect, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();
  const[itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('drinks');
  const categories = [
    {
      name:'drinks',
      imageUrl: 'https://bakewithshivesh.com/wp-content/uploads/2022/04/IMG_9331-scaled.jpg'

    },
    {
      name: 'rice',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf7OG6nzgJKZuzMF-NZV2Yk4gTLQaRdp9J5g&s'
    },
    {
      name: 'noodles',
      imageUrl: 'https://www.chilipeppermadness.com/wp-content/uploads/2023/06/Gochujang-Noodles-Recipe-SQ.jpg'
    }
  ]
  //useEffect
  useEffect(() => {
    const getAllItems = async () =>{
      try{
        dispatch({
          type:"SHOW_LOADING",
        })
        const {data} = await axios.get('/api/items/get-item')
        setItemsData(data);
        dispatch({
          type:"HIDE_LOADING",
        })
        console.log(data);
      }catch(error){
        dispatch({
          type:"HIDE_LOADING",
        })
        console.group(error);
      }
    }
    getAllItems()
  },[dispatch])
  return (
    <div>
      <DefaultLayout>
        <div className='d-flex'>
          {categories.map(category =>(
            <div key={category.name} className={`d-flex category ${selectedCategory === category.name && 'category-active'}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <h4>{category.name}</h4>
              <img src={category.imageUrl} alt={category.name} height='40px' width='60px' />
            </div>
          ))}
        </div>
        <Row>
          {
            itemsData.filter(i => i.category === selectedCategory).map(item => (
              <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item}/>
              </Col>
            )) 
          }
        </Row>
      </DefaultLayout>
    </div>
  )
}

export default HomePage
