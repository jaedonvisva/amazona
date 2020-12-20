import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutWizard from '../components/CheckoutWizard';

export default function ShippingScreen(props) {
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch action
    dispatch(
      saveShippingAddress({ address, fullName, city, postalCode, country })
    );

    props.history.push('payment');
  };
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  return (
    <div>
      <CheckoutWizard step1 step2></CheckoutWizard>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label>Full name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Postal Code"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
