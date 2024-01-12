import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import * as usersService from "../../utilities/users-service";
import * as ordersAPI from '../../utilities/orders-api';

import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';

import styles from "../../styles/OrderHistoryPage.module.css";
import Sidebar from '../../components/Sidebar/Sidebar';

function OrderHistoryPage(props)
{
  const { user = {}, setUser = () => {} } = props;
  const [ orders, setOrders ] = useState([]);
  const [ activeOrder, setActiveOrder ] = useState(null);
  
  useEffect(() => { fetchOrderHistory(); }, []);
  
  async function fetchOrderHistory() 
  {
    const orders = await ordersAPI.getOrderHistory();
    setOrders(orders);
    setActiveOrder(orders[0] || null);
  }
  
  //# Event Handlers
  async function handleCheckToken()
  {
    let exp = await usersService.checkToken();
    alert(exp);
  }
  
  function handleSelectOrder(order) { setActiveOrder(order); }

  // return (
  //   <>
  //     <h1> OrderHistory Page</h1>
  //   </>
  // );
  
  return (
    <main className={styles.OrderHistoryPage}>
      <Sidebar user={user} setUser={setUser} >
        <Link to="/orders/new" className="button btn-sm">NEW ORDER</Link>
      </Sidebar>
      <OrdersList
        orders={orders}
        activeOrder={activeOrder}
        handleSelectOrder={handleSelectOrder}
      />
      <OrderDetail order={activeOrder} />
    </main>
  );
}

export default OrderHistoryPage
