import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    fetchingData: false,
    errorMsg: '',
  }

  getLoginTheUser = jwtToken => {
    const {username, password} = this.state
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    history.replace('/')
  }

  getDisplayErrorMsg = error => {
    this.setState({errorMsg: error, fetchingData: true})
  }

  loginTheUser = async event => {
    const {username, password} = this.state
    console.log(username)
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getLoginTheUser(data.jwt_token)
    } else {
      this.getDisplayErrorMsg(data.error_msg)
    }
  }

  userInput = event => {
    this.setState({username: event.target.value})
  }

  userPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, fetchingData, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect path="/" />
    }
    return (
      <div className="login-page-container">
        <img
          src="https://res.cloudinary.com/duezhxznc/image/upload/v1676713243/Group_7399_vkfpk3.png"
          className="movies-heading1"
          alt="login website logo"
        />

        <form className="login-form" onSubmit={this.loginTheUser}>
          <h1 className="form-heading">Login</h1>
          <label htmlFor="username" className="username-label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="username-input"
            onChange={this.userInput}
            value={username}
          />
          <label htmlFor="password" className="password-label">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="password-input"
            onChange={this.userPassword}
            value={password}
          />
          {fetchingData && <p className="error-msg">{errorMsg}</p>}
          <div className="form-button-container">
            <button type="submit" className="form-button">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage
