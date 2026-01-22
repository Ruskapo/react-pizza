import axios from "axios";
import qs from "qs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { context } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { list } from "../components/Sort";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

// Главная страница
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter,
  );

  const { searchValue } = React.useContext(context);
  const [itemsPizza, setItemsPizza] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  // Изменение категории
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // Изменение страницы
  const onChangePage = (numberPage) => {
    dispatch(setCurrentPage(numberPage));
  };

  // Получение пицц с сервера
  const fetchPizzas = () => {
    setLoading(true);
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://69344d6a4090fe3bf01f91ec.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((response) => {
        setItemsPizza(response.data);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setItemsPizza([]);
        } else {
          console.log(err);
        }
      })
      .finally(() => setLoading(false));
  };

  // Получаем параметры из URL при первом рендере
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Ререндер пицц при изменении категорий, сортировки, поиска и страницы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Сохраняем параметры в URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Отрисовка пицц
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

  // Отрисовка скелетов
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
