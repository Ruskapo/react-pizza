import qs from "qs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { list } from "../components/Sort";

import {
  selectorFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/selector";
import { selectPizzaData } from "../redux/pizza/selector";
import { fetchPizzas } from "../redux/pizza/slice";
import { SearchPizzaParams } from "../redux/pizza/types";
import { useAppDispatch } from "../redux/store";

// Главная страница
const Home: React.FC = () => {
  // Инициализация навигации и диспетчера Redux
  const navigate = useNavigate();
  // Инициализация диспетчера Redux
  const dispatch = useAppDispatch();
  // Рефы для отслеживания первого рендера и поиска в URL
  const isSearch = React.useRef(false);
  // Реф для отслеживания монтирования компонента
  const isMounted = React.useRef(false);
  // Получение данных пицц из состояния Redux
  const { items: itemsPizza, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectorFilter);

  // Изменение категории
  const onChangeCategory = React.useCallback(
    (idx: number) => {
      dispatch(setCategoryId(idx));
    },
    [dispatch],
  );

  // Изменение страницы
  const onChangePage = (numberPage: number) => {
    dispatch(setCurrentPage(numberPage));
  };

  // Получение пицц при изменении параметров
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (isSearch.current) {
      isSearch.current = false;
      return;
    }

    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    isSearch.current = false;
  }, [sort.sortProperty, categoryId, searchValue, currentPage, dispatch]);

  // Получаем параметры из URL при первом рендере
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1),
      ) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      // Диспетчеризация действия для установки фильтров из URL
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

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
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  // Отрисовка пицц
  const pizzas = itemsPizza.map((objPizz: any) => (
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
        <Sort value={sort} />
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
