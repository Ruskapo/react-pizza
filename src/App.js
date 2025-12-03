import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import "./scss/app.scss";

function App() {
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
            <PizzaBlock title="Мехико" price="333" />
            <PizzaBlock title="Чизбургер-пицца" price="343" />
            <PizzaBlock title="Чизбургер-пицца" price="553" />
            <PizzaBlock title="Чизбургер-пицца" price="444" />
            <PizzaBlock title="Чизбургер-пицца" price="666" />
            <PizzaBlock title="Чизбургер-пицца" price="111" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
