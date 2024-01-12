import React from 'react'

import styles from "../../styles/MenuList.module.css";

function MenuListItem(props)
{
  const { menuItem, handleAddToOrder } = props;
  return (
    <div className={styles.MenuListItem}>
      <div className={styles.emoji + ' ' + 'flex-ctr-ctr'}>{menuItem.emoji}</div>
      <div className={styles.name}>{menuItem.name}</div>
      <div className={styles.buy}>
        <span>${menuItem.price.toFixed(2)}</span>
        <button className="btn-sm" onClick={() => handleAddToOrder(menuItem._id)}>
          ADD
        </button>
      </div>
    </div>
  );
}

export default MenuListItem;
