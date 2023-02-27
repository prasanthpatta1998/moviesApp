import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  state = {
    smHamburger: false,
    searchInput: '',
    searchFunction: 'false',
  }

  componentDidMount() {
    const {boolValue} = this.props
    this.setState({searchFunction: boolValue})
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

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInput}
          onChange={this.onChangeSearchInputValue}
          placeholder="Search"
          className="header-search-input"
        />
        <button
          type="button"
          className="header-search-button-type"
          onClick={this.onShowResultsOfSearch}
        >
          <HiOutlineSearch className="search-icon-type" />
        </button>
      </div>
    )
  }

  renderSearchIcon = () => (
    <button
      type="button"
      className="header-search-button"
      onClick={this.onChangeToSearchPage}
      testid="searchButton"
    >
      <HiOutlineSearch className="search-icon" />
    </button>
  )

  onChangeSearchInputValue = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {smHamburger, searchFunction} = this.state
    return (
      <nav className="header-container">
        <div className="movies-hamburg-container">
          <Link to="/" className="link-decoration">
            <img
              src="https://res.cloudinary.com/duezhxznc/image/upload/v1676713243/Group_7399_vkfpk3.png"
              alt="website logo"
              className="home-movies-heading"
            />
          </Link>
          <Link to="/" className="link-decoration">
            <li className="md-home">Home</li>
          </Link>
          <Link to="/popular" className="link-decoration">
            <li className="md-popular">Popular</li>
          </Link>
          <div className="search-container">
            {searchFunction === 'true'
              ? this.renderSearchInput()
              : this.renderSearchIcon()}
            <Link to="/account" className="link-decoration">
              <img
                src="https://res.cloudinary.com/duezhxznc/image/upload/v1676874683/Avatar_ywnmti.png"
                alt="profile"
                className="profile-image"
              />
            </Link>
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
    )
  }
}

export default withRouter(Header)
