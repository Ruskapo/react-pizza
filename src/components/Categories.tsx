import React from "react";

// Типы пропсов для компонента Categories
type CategoriesProps = {
  value: number;
  onClickCategory: any;
};

// Компонент для отображения категорий пиццы
const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
