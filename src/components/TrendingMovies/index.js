import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import './index.css'

const movieApiTrendingStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function SampleNextArrow(props) {
  const {onClick} = props
  return (
    <div className="arrow next-arrow">
      <IoIosArrowForward onClick={onClick} />
    </div>
  )
}

function SamplePrevArrow(props) {
  const {onClick} = props

  return (
    <div className="arrow prev-arrow">
      <IoIosArrowBack onClick={onClick} />
    </div>
  )
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

class TrendingMovies extends Component {
  state = {
    trendingList: [],
    movieTrendingStatus: movieApiTrendingStatus.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({movieTrendingStatus: movieApiTrendingStatus.inProgress})
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
      this.setState({
        trendingList: newList,
        movieTrendingStatus: movieApiTrendingStatus.success,
      })
    } else {
      this.setState({movieTrendingStatus: movieApiTrendingStatus.failure})
    }
  }

  renderSlider = () => {
    const {trendingList} = this.state
    return (
      <Slider {...settings}>
        {trendingList.map(eachLogo => {
          const {id, posterPath, title} = eachLogo
          return (
            <Link to={`/movies/${id}`}>
              <div className="slick-item" key={id}>
                <img className="logo-image" src={posterPath} alt={title} />
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  onRefreshTrendingPage = () => {
    this.getTrendingMovies()
  }

  renderTrendingLoader = () => (
    <div className="trending-loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        className="trending-loader"
      />
    </div>
  )

  renderTrendingFailure = () => (
    <div className="trending-loader-container">
      <img
        src="https://res.cloudinary.com/duezhxznc/image/upload/v1677144753/alert-triangle_ubtgex.png"
        alt="failure view"
        className="trending-failure-view"
      />
      <p className="trending-failure-view-name">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="trending-failure-button"
        onClick={this.onRefreshTrendingPage}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingSuccess = () => (
    <div className="main-container">
      <h1 className="trending-now-heading">Trending Now</h1>
      <div className="slick-container">{this.renderSlider()}</div>
    </div>
  )

  getTrendingMovieList = () => {
    const {movieTrendingStatus} = this.state

    switch (movieTrendingStatus) {
      case movieApiTrendingStatus.inProgress:
        return this.renderTrendingLoader()
      case movieApiTrendingStatus.success:
        return this.renderTrendingSuccess()
      case movieApiTrendingStatus.failure:
        return this.renderTrendingFailure()
      default:
        return null
    }
  }

  render() {
    return this.getTrendingMovieList()
  }
}
export default TrendingMovies
