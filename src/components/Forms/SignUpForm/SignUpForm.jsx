import React, { Component } from "react";

import { signUp } from '../../../utilities/users-service';

import styles from "../Form.module.css";

export default class SignUpForm extends Component
{
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (event) =>
  {
    this.setState({
      [ event.target.name ]: event.target.value,
      error: ''
    });
  };

  handleSubmit = async (event) =>
  {
    event.preventDefault();
    // alert(JSON.stringify(this.state));
    try
    {
      const formData = { ...this.state };

      delete formData.error;
      delete formData.confirm;

      const user = await signUp(formData);
      console.log(user);
      this.props.setUser(user);
      this.setState({ error: "" });

    } catch (error)
    {
      console.log(error);
      this.setState({
        error: "Sign Up Failed - Try Again"
      });
    }
  };

  render()
  {
    const disable = this.state.password !== this.state.confirm;

    return (
      <div className={styles.Form}>
        <header className="form-header">
          <h1>Sign Up</h1>
        </header>
        <div className="form-container">
          {this.state.error.length > 0 ? <p className="error-message">{this.state.error}</p> : <></>}
          <form autoComplete="off" onSubmit={this.handleSubmit} style={{ margin: "1em" }}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}
