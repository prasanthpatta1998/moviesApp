import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  state = {
    smHamburger: false,
  }

  onChangeHamburger = () => {
    this.setState({smHamburger: true})
  }

  onCloseHamburgerTab = () => {
    this.setState({smHamburger: false})
  }

  onChangeToSearchPage = () => {
    const {history} = this.props
    history.replace('/search')
  }

  onShowResultsOfSearch = () => {
    const {searchInput} = this.state
    const {onSearchMovies} = this.props
    onSearchMovies(searchInput)
  }

  render() {
    const {smHamburger} = this.state
    return (
      <>
        <nav className="header-container">
          <div className="movies-hamburg-container">
            <Link to="/" className="link-decoration">
              <img
                src="https://res.cloudinary.com/duezhxznc/image/upload/v1676713243/Group_7399_vkfpk3.png"
                alt="website logo"
                className="home-movies-heading"
              />
            </Link>
            <div className="search-container">
              <button
                type="button"
                className="header-search-button"
                onClick={this.onChangeToSearchPage}
                data-testid="searchButton"
              >
                <HiOutlineSearch className="search-icon" />
              </button>
              <button
                type="button"
                className="hamburger-button"
                onClick={this.onChangeHamburger}
              >
                <img
                  src="https://res.cloudinary.com/duezhxznc/image/upload/v1676788107/add-to-queue_1_r5cfan.png"
                  className="search-icon-image"
                  alt="nav-bar"
                />
              </button>
            </div>
          </div>
          {smHamburger && (
            <ul className="sm-tabs-container">
              <Link to="/" className="link-decoration">
                <li className="hamburg-items">Home</li>
              </Link>
              <Link to="/popular" className="link-decoration">
                <li className="hamburg-items">Popular</li>
              </Link>
              <Link to="/account" className="link-decoration">
                <li className="hamburg-items">Account</li>
              </Link>
              <li className="hamburg-items-1">
                <button
                  className="hamburg-item-button"
                  type="button"
                  onClick={this.onCloseHamburgerTab}
                >
                  <AiFillCloseCircle className="hamburg-close-image" />
                </button>
              </li>
            </ul>
          )}
        </nav>
        <nav className="md-header-container">
          <ul className="md-movies-hamburg-container">
            <Link to="/" className="link-decoration">
              <img
                src="https://res.cloudinary.com/duezhxznc/image/upload/v1676713243/Group_7399_vkfpk3.png"
                alt="website logo"
                className="md-home-movies-heading"
              />
            </Link>
            <Link to="/" className="link-decoration">
              <li className="md-hamburg-items">Home</li>
            </Link>
            <Link to="/popular" className="link-decoration">
              <li className="md-hamburg-items-2">Popular</li>
            </Link>
          </ul>
          <div className="profile-container">
            <button
              type="button"
              className="md-header-search-button"
              onClick={this.onChangeToSearchPage}
              data-testid="searchButton"
            >
              <HiOutlineSearch className="md-search-icon" />
            </button>
            <Link to="/account" className="link-decoration">
              <img
                src="https://res.cloudinary.com/duezhxznc/image/upload/v1676874683/Avatar_ywnmti.png"
                alt="profile"
                className="profile-image"
              />
            </Link>
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
