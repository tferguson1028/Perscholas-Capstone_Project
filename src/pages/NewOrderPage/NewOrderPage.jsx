import React, {useEffect, useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';

import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

import styles from "../../styles/NewOrderPage.module.css";
import Sidebar from '../../components/Sidebar/Sidebar';

function NewOrderPage(props)
{
  const { user, setUser } = props;
  const [ menuItems, setMenuItems ] = useState([]);
  const [ activeCategory, setActiveCategory ] = useState('');
  const [ cart, setCart ] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();
  
  useEffect(() => { getItems(); getCart(); }, []);
  
  async function getItems()
  {
    const items = await itemsAPI.getAll();
    categoriesRef.current = items.reduce((allCategories, item) =>
    {
      const itemCategory = item.category.name;
      return allCategories.includes(itemCategory) ? allCategories : [...allCategories, itemCategory];
    }, []);
    
    setMenuItems(items);
    setActiveCategory()
  }
  
  async function getCart()
  {
    const cart = await ordersAPI.getCart();
    setCart(cart);
  }
  
  //# Event Handlers
  async function handleAddToOrder(itemId) 
  {
    const updatedCart = await ordersAPI.addItemToCart(itemId);
    setCart(updatedCart);
  }

  async function handleChangeQty(itemId, newQty) 
  {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() 
  {
    await ordersAPI.checkout();
    navigate('/orders');
  }
  
  return (
    <main className={styles.NewOrderPage}>
      <Sidebar user={user} setUser={setUser} >
        <CategoryList
          categories={categoriesRef.current}
          cart={setCart}
          setActiveCategory={setActiveCategory}
        />
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
      </Sidebar>
      <MenuList
        menuItems={menuItems.filter(item => item.category.name === activeCategory)}
        handleAddToOrder={handleAddToOrder}
      />
      <OrderDetail
        order={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}

export default NewOrderPage;
