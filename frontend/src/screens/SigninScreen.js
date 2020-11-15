import React from 'react';

export default function SigninScreen() {
  const submitHandler = (e) => {
    e.preventDefault();
    // call signin action
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Signin</h1>
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter Email"
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Enter Password"
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary">Sign In</button>
        </div>
      </form>
    </div>
  );
}
