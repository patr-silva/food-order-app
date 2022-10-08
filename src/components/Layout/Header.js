import React from "react";
import mealsImg from "../../assets/lee-myungseong-y1XXWct5rBo-unsplash.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Food Order</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt='Table full of meals' />
      </div>
    </>
  );
};

export default Header;
