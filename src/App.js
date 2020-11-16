import React, { Component } from 'react'
import "./App.css"
import validator from "validator"


export default class App extends Component {
  state = {
    email: "",
    password: "",
    isEmail: true,
    inValidEmailMessage: '',
    isPassword: true,
    inValidPassWordMessage: '',
  }

  handleEmailInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      // check if email is valid
      if (event.target.value.includes("@")) {
        this.setState({ isEmail: true })
      } else {
        this.setState({
          isEmail: false,
          inValidEmailMessage: 'Please type correct email format'
        })
      }
    })
  }

  handlePasswordInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      // check if password is valid
      let { isPassword, password, } = this.state
      isPassword = validator.matches(password, "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      if (isPassword) {
        this.setState({
          isPassword: true,
        })
      } else {
        this.setState({
          isPassword: false,
          inValidPassWordMessage: "Password must include a symbol, a number, an uppercase, and a lowercase"
        })

      }
    })
  }

  render() {
    const {
      email,
      password,
      isEmail,
      inValidEmailMessage,
      isPassword,
      inValidPassWordMessage,
    } = this.state
    return (
      <form>
        {isEmail ? "" : <p className="error-message">{inValidEmailMessage}</p>}
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.handleEmailInput}
        ></input><br />

        {isPassword ? "" : <p className="error-message">{inValidPassWordMessage}</p>}
        <input
          type="text"
          name="password"
          value={password}
          onChange={this.handlePasswordInput}
        ></input><br />

        <button>Sign Up</button>
      </form>
    )
  }
}
