import React from 'react'

function Categories() {
  const [activeCategories, setActiveCategories] = React.useState(0);
  
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  const onClickCategories = (index) => {
    setActiveCategories(index);
  };
  
  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li onClick={() => onClickCategories(i)} className={activeCategories === i ? 'active' : ''}>
            {value}

        </li>
        ))}
        
      </ul>
    </div>
  )
}

export default Categories;
