import qs from "qs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { context } from "../App";
import { fetchPizzas } from "../redux/slices/PizzaSlice";

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
  // Инициализация навигации и диспетчера Redux
  const navigate = useNavigate();
  // Инициализация диспетчера Redux
  const dispatch = useDispatch();
  // Рефы для отслеживания первого рендера и поиска в URL
  const isSearch = React.useRef(false);
  // Реф для отслеживания монтирования компонента
  const isMounted = React.useRef(false);
  // Получение данных пицц из состояния Redux
  const { items: itemsPizza, status } = useSelector((state) => state.pizza);
  // Получение данных фильтров из состояния Redux
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter,
  );

  // Получение значения поиска из контекста
  const { searchValue } = React.useContext(context);

  // Изменение категории
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // Изменение страницы
  const onChangePage = (numberPage) => {
    dispatch(setCurrentPage(numberPage));
  };

  // Получение пицц с сервера
  const getPizzas = async () => {
    // Формирование параметров запроса
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    // Удаление минуса из свойства сортировки
    const sortBy = sort.sortProperty.replace("-", "");
    // Категория
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    // Поиск
    const search = searchValue ? `&search=${searchValue}` : "";

    // Диспетчеризация асинхронного действия для получения пицц
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
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
    // if (!isSearch.current) {
    getPizzas();
    //}
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
      id={objPizz.id}
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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? sceletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
