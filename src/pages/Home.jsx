import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

const Home = () => {
  const [itemsPizza, setItemsPizza] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    setLoading(true);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    fetch(
      `https://69344d6a4090fe3bf01f91ec.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((Response) => Response.json())
      .then((arr) => {
        setItemsPizza(arr);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : itemsPizza.map((objPizz) => (
              <PizzaBlock
                key={objPizz.id}
                title={objPizz.title}
                price={objPizz.price}
                image={objPizz.imageUrl}
                sizes={objPizz.sizes}
                types={objPizz.types}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
