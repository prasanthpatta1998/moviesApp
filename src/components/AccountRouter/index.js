import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

const AccountRouter = props => {
  const onLogoutTheUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    history.replace('/login')
  }

  const userName = localStorage.getItem('username')

  return (
    <div className="account-details-container">
      <Header boolValue="false" />

      <div className="account-header-background"> </div>
      <h1 className="account-heading">Account</h1>
      <hr className="horizontal-line" />
      <p className="membership-heading">Member Ship</p>
      <p className="member-userName">{`${userName}@gmail.com`}</p>
      <p className="member-password">
        Password: <span>********</span>
      </p>
      <hr className="horizontal-line-2" />
      <p className="membership-plan-heading">Plan Details</p>
      <p className="member-premium">Premium</p>
      <p className="quality-type">Ultra HD</p>
      <hr className="horizontal-line-3" />
      <button
        type="button"
        className="account-logout-button"
        onClick={onLogoutTheUser}
      >
        Logout
      </button>

      <div className="account-contact-icons-container">
        <FaGoogle className="account-google-icon account-google" />
        <FaTwitter className="account-google-icon account-twitter" />
        <FaInstagram className="account-google-icon account-instagram" />
        <FaYoutube className="account-google-icon account-facebook" />
      </div>
      <p className="account-contact-heading">Contact us</p>
    </div>
  )
}

export default AccountRouter
