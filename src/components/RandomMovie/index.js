import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const movieApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RandomMovie extends Component {
  state = {
    randomMovie: {},
    movieStatus: movieApiStatus.initial,
  }

  componentDidMount() {
    this.getRandomMovie()
  }

  getRandomMovie = async () => {
    this.setState({movieStatus: movieApiStatus.inProgress})
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const newList = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      newList.sort(() => Math.random() - 0.5)
      this.setState({
        randomMovie: newList[0],
        movieStatus: movieApiStatus.success,
      })
    } else {
      this.setState({movieStatus: movieApiStatus.failure})
    }
  }

  onRefreshPage = () => {
    this.getRandomMovie()
  }

  renderLoader = () => (
    <div className="random-loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        className="random-loader"
      />
    </div>
  )

  renderSuccess = () => {
    const {randomMovie} = this.state
    const {backdropPath, title, overview, posterPath} = randomMovie

    return (
      <>
        <img src={posterPath} alt={title} className="random-image" />
        <img src={backdropPath} alt={title} className="random-image-backdrop" />
        <h1 className="random-heading">{title}</h1>
        <p className="random-overview">{overview}</p>
        <button className="random-play-button" type="button">
          Play
        </button>
        <div className="random-linear-gradient"> </div>
      </>
    )
  }

  renderFailure = () => (
    <div className="random-failure-container">
      <img
        src="https://res.cloudinary.com/duezhxznc/image/upload/v1677144753/alert-triangle_ubtgex.png"
        alt="failure"
        className="random-failure-view"
      />
      <p className="failure-view">Something went wrong. Please try again</p>
      <button
        type="button"
        className="random-failure-button"
        onClick={this.onRefreshPage}
      >
        Try Again
      </button>
    </div>
  )

  renderState = () => {
    const {movieStatus} = this.state

    switch (movieStatus) {
      case movieApiStatus.inProgress:
        return this.renderLoader()
      case movieApiStatus.success:
        return this.renderSuccess()
      case movieApiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderState()
  }
}

export default RandomMovie
