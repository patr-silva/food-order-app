import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [mealsAvailable, setMealsAvailable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://food-order-fc154-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        const fetchedMeals = [];

        for (const key in data) {
          fetchedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMealsAvailable(fetchedMeals);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setHttpError(error.message);
        console.log(error);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = mealsAvailable.map((elem) => {
    return <MealItem key={elem._id} meal={elem} />;
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
