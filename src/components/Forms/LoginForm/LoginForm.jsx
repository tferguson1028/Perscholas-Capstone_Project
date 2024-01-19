import React, { useState } from "react";

import * as usersService from '../../../utilities/users-service';
import styles from "../Form.module.css";

export default function LoginForm(props) 
{
  const { setUser } = props;
  const [ credentials, setCredentials ] = useState({ email: "", password: "" });
  const [ error, setError ] = useState("");

  function handleChange(event)
  {
    setCredentials({ ...credentials, [ event.target.name ]: event.target.value });
    setError("");
  }

  async function handleSubmit(event)
  {
    // Prevent form from being submitted to the server
    event.preventDefault();
    try
    {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      await setUser(user);

    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className={styles.Form}>
      <header className="form-header">
        <h1>Log In Form</h1>
      </header>
      <div className="form-container" onSubmit={handleSubmit}>
        {error.length > 0 ? <p className="error-message">{error}</p> : <></>}
        <form autoComplete="off">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email} onChange={handleChange} required
          />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
