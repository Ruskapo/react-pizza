import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Полная информация о пицце
const FullPizza = () => {
  // Состояние для хранения данных пиццы
  const [pizza, setPizza] = React.useState();
  // Получение параметра id из URL
  const { id } = useParams();
  // Навигация для перенаправления
  const navigate = useNavigate();
  // Загрузка данных пиццы при монтировании компонента
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://69344d6a4090fe3bf01f91ec.mockapi.io/items/` + id,
        );
        setPizza(data);
      } catch (error) {
        console.log("Ошибка при получении пиццы:", error);
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Загрузка...'</>;
  }

  return (
    <div className="container">
      <img src={pizza?.imageUrl} alt={pizza?.name} />
      <h2>{pizza?.title}</h2>
      <h4>{pizza?.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
