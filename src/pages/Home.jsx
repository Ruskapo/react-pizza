import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { context } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(context);
  const [itemsPizza, setItemsPizza] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setLoading(true);
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://69344d6a4090fe3bf01f91ec.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((Response) => Response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItemsPizza(data);
          console.log();
        } else setItemsPizza([]);

        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = itemsPizza.map((objPizz) => (
    <PizzaBlock
      key={objPizz.id}
      title={objPizz.title}
      price={objPizz.price}
      image={objPizz.imageUrl}
      sizes={objPizz.sizes}
      types={objPizz.types}
    />
  ));

  const sceletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
