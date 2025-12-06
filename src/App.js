import React from 'react'
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import "./scss/app.scss";

function App() {
  const [itemsPizza, setItemsPizza] = React.useState([]);

  React.useEffect(() => {
    fetch('https://69344d6a4090fe3bf01f91ec.mockapi.io/items')
        .then((Response) => Response.json())
        .then((obj) => {
          setItemsPizza(obj);
        });
  }, []);




  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              itemsPizza.map((objPizz) => (
                <PizzaBlock
                 key={objPizz.id}
                 title = {objPizz.title}
                 price = {objPizz.price}
                 image = {objPizz.imageUrl}
                 sizes = {objPizz.sizes}
                 types = {objPizz.types}
                 
                 />
              ))
            }
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
