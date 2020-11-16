import React, { Component } from 'react'
import "./App.css"
import validator from "validator"


export default class App extends Component {
  state = {
    email: "",
    password: "",
    isEmailError: false,
    inValidEmailMessage: '',
    isPasswordError: false,
    inValidPassWordMessage: '',
    submitError: false,
    submitErrorMessage: ""
  }

  handleEmailInput = (event) => {
    this.setState({
    // Connect input value and name to state
      [event.target.name]: event.target.value,
    }, () => {
      // check if email is valid
      if (event.target.value.includes("@")) {
        this.setState({ isEmailError: false })
      } else {
        this.setState({
          isEmailError: true,
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
      let { password } = this.state
      let isPassword = validator.matches(password, "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      if (isPassword) {
        this.setState({
          isPasswordError: false,
        })
      } else {
        this.setState({
          isPasswordError: true,
          inValidPassWordMessage: "Password must include a symbol, a number, an uppercase, and a lowercase"
        })
      }
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    let { email, password } = this.state
    if (validator.isEmpty(email) && validator.isEmpty(password)) {
      this.setState({
        submitError: true,
        submitErrorMessage: "Must fill Email and Password"
      })
      return;
    } else {
      this.setState({
        submitError: false,
        submitErrorMessage: ""
      })
    }

    if (validator.isEmpty(email)) {
      this.setState({
        submitError: true,
        submitErrorMessage: "Must fill Email"
      })
      return;
    } else {
      this.setState({
        email: "",
        password: "",
        submitError: false,
        submitErrorMessage: ""
      })
    }

    if (validator.isEmpty(password)) {
      this.setState({
        email: "",
        password: "",
        submitError: true,
        submitErrorMessage: "Must fill Password"
      })
    } else {
      this.setState({
        email: "",
        password: "",
        submitError: false,
        submitErrorMessage: ""
      })
    }

    console.log(this.state.email)
    console.log(this.state.password)
  }

  render() {
    const {
      email,
      password,
      isEmailError,
      inValidEmailMessage,
      isPasswordError,
      inValidPassWordMessage,
      submitError,
      submitErrorMessage
    } = this.state
    return (
      <form onSubmit={this.handleOnSubmit}>
        {submitError ? <p className="error-message">{submitErrorMessage}</p> : ""}
        {isEmailError ? <p className="error-message">{inValidEmailMessage}</p> : ""}
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.handleEmailInput}
        ></input><br />

        {isPasswordError ? <p className="error-message">{inValidPassWordMessage}</p> : ""}
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
