import { useState, useRef } from "react";
import classes from "./CheckOut.module.css";

const CheckOut = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const dataValidation = (value) => {
    return value.trim() !== "";
  };

  const postalCodeValidation = (value) => {
    return value.trim().length === 5;
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameValidation = dataValidation(enteredName);
    const enteredStreetValidation = dataValidation(enteredStreet);
    const enteredPostalCodeValidation = postalCodeValidation(enteredPostalCode);
    const enteredCityValidation = dataValidation(enteredCity);

    setFormInputValidity({
      name: enteredNameValidation,
      street: enteredStreetValidation,
      postalCode: enteredPostalCodeValidation,
      city: enteredCityValidation,
    });

    const formIsValid =
      enteredNameValidation &&
      enteredStreetValidation &&
      enteredPostalCodeValidation &&
      enteredCityValidation;

    if (!formIsValid) {
      return;
    }

    props.onSubmitData({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const streetClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;

  const postalCodeClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;

  const cityClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter your name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter your street</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter your city</p>}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirme</button>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
