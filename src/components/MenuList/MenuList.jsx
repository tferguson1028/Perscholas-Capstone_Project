import React from 'react'

import MenuListItem from './MenuListItem';

import styles from "../../styles/MenuList.module.css";

function MenuList(props)
{
  const { menuItems = [], handleAddToOrder } = props;
  
  function getItems()
  {
    return menuItems.map(item =>
      <MenuListItem
        key={item._id}
        handleAddToOrder={handleAddToOrder}
        menuItem={item}
      />
    );
  }
  
  return (
    <main className={styles.MenuList}>
      { getItems() }
    </main>
  );
}

export default MenuList;
