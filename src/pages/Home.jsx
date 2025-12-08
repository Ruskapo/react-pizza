import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

const Home = () => {
  const [itemsPizza, setItemsPizza] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://69344d6a4090fe3bf01f91ec.mockapi.io/items")
      .then((Response) => Response.json())
      .then((obj) => {
        setItemsPizza(obj);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
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
    </>
  );
};

export default Home;
