import React from 'react'

import styles from "../../styles/CategoryList.module.css";

function CategoryList(props)
{
  const { categories, activeCategory, setActiveCategory } = props;
  
  function getCategories()
  {
    return categories.map((category) => {
      return (
        <li
          key={category}
          className={category === activeCategory ? styles.active : ""}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </li>
      );
    });
  }

  return (
    <ul className={styles.CategoryList}>
      { getCategories() }
    </ul>
  );
}

export default CategoryList;
