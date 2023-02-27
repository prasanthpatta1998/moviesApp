import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const movieApiSearchStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchMovieRouter extends Component {
  state = {
    searchInput: '',
    searchResults: [],
    searchState: movieApiSearchStatus.initial,
    page: 1,
    searchPaginationList: [],
  }

  showSearchResults = async () => {
    this.setState({searchState: movieApiSearchStatus.inProgress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const newList = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        searchResults: newList,
        searchState: movieApiSearchStatus.success,
        searchPaginationList: newList.slice(0, 16),
      })
    } else {
      this.setState({searchState: movieApiSearchStatus.failure})
    }
  }

  onSearchMovies = inputValue => {
    if (inputValue === '') {
      this.setState({
        searchInput: inputValue,
        searchResults: [],
        searchState: movieApiSearchStatus.success,
      })
    } else {
      this.setState({searchInput: inputValue}, this.showSearchResults)
    }
  }

  searchBackwardButton = () => {
    const {page, searchResults} = this.state
    if (page === 1) {
      this.setState({page: 1})
    } else {
      const lastIndex = (page - 1) * 16
      const firstIndex = lastIndex - 16
      const pageList = searchResults.slice(firstIndex, lastIndex)
      this.setState(prevState => ({
        page: prevState.page - 1,
        searchPaginationList: pageList,
      }))
    }
  }

  searchForwardButton = () => {
    const {page, searchResults} = this.state

    const totalPages = Math.ceil(searchResults.length / 16)
    if (page === totalPages) {
      this.setState({page: totalPages})
    } else {
      const lastIndex = (page + 1) * 16
      const firstIndex = lastIndex - 16
      const pageList = searchResults.slice(firstIndex, lastIndex)
      this.setState(prevState => ({
        page: prevState.page + 1,
        searchPaginationList: pageList,
      }))
    }
  }

  onRefreshSearchPage = () => {
    this.showSearchResults()
  }

  renderSearchLoader = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        className="popular-loader"
      />
    </div>
  )

  renderSearchSuccess = () => {
    const {searchResults, searchInput, page, searchPaginationList} = this.state
    const totalPages = Math.ceil(searchResults.length / 16)
    if (searchInput === '') {
      return null
    }
    if (searchResults.length === 0) {
      return (
        <div className="popular-loader-container">
          <img
            src="https://res.cloudinary.com/duezhxznc/image/upload/v1677171280/Group_7394_mnyo7m.png"
            alt="no movies"
            className="search-invalid-view"
          />
          <p className="search-invalid-data">
            {`Your search for ${searchInput} did not find any matches.`}
          </p>
        </div>
      )
    }
    return (
      <>
        <ul className="search-ul-item">
          {searchPaginationList.map(eachMovie => {
            const {id, posterPath, title} = eachMovie
            return (
              <Link to={`/movies/${id}`}>
                <li className="search-movie-image" key={id}>
                  <img src={posterPath} alt={title} className="search-image" />
                </li>
              </Link>
            )
          })}
        </ul>
        <div className="search-pagination-buttons">
          <button
            type="button"
            className="search-backward-button"
            onClick={this.searchBackwardButton}
          >
            <IoIosArrowBack className="search-backward" />
          </button>
          <p className="search-page-numbers">{`${page} of ${totalPages}`}</p>
          <button
            type="button"
            className="search-forward-button"
            onClick={this.searchForwardButton}
          >
            <IoIosArrowForward className="search-forward" />
          </button>
        </div>
      </>
    )
  }

  renderSearchFailure = () => (
    <div className="search-loader-container">
      <img
        src="https://res.cloudinary.com/duezhxznc/image/upload/v1677152293/Background-Complete_ojhbus.png"
        alt="failure view"
        className="search-failure-view"
      />
      <p className="search-failure-view-name">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="search-failure-button"
        onClick={this.onRefreshSearchPage}
      >
        Try Again
      </button>
    </div>
  )

  getSearchMovieList = () => {
    const {searchState} = this.state

    switch (searchState) {
      case movieApiSearchStatus.inProgress:
        return this.renderSearchLoader()
      case movieApiSearchStatus.success:
        return this.renderSearchSuccess()
      case movieApiSearchStatus.failure:
        return this.renderSearchFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-background-container">
        <Header boolValue="true" onSearchMovies={this.onSearchMovies} />
        {this.getSearchMovieList()}
      </div>
    )
  }
}

export default SearchMovieRouter
