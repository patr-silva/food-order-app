import React, {useContext} from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cartContext";

const MealItem = (props) => {
  const { id, name, description, price } = props.meal;
  const cartCtx = useContext(CartContext)

  const addToCartHandler = (amount)=>{
    cartCtx.addItem({
      id,
      name,
      amount,
      price,
    })
  }
  return (
    <li key={id} className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{`$${price}`}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={id}/>
      </div>
    </li>
  );
};

export default MealItem;
