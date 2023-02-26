import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import './index.css'

const movieApiTopRatedStatus = {
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

class TopRatedMovies extends Component {
  state = {
    originalList: [],
    movieTopRatedStatus: movieApiTopRatedStatus.initial,
  }

  componentDidMount() {
    this.getOriginalMovies()
  }

  getOriginalMovies = async () => {
    this.setState({movieTopRatedStatus: movieApiTopRatedStatus.inProgress})
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
        originalList: newList,
        movieTopRatedStatus: movieApiTopRatedStatus.success,
      })
    } else {
      this.setState({movieTopRatedStatus: movieApiTopRatedStatus.failure})
    }
  }

  renderSlider = () => {
    const {originalList} = this.state
    return (
      <Slider {...settings}>
        {originalList.map(eachLogo => {
          const {id, backdropPath, title} = eachLogo
          return (
            <Link to={`/movies/${id}`}>
              <div className="original-slick-item" key={id}>
                <img
                  className="original-logo-image"
                  src={backdropPath}
                  alt={title}
                />
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  onRefreshOriginalMovies = () => {
    this.getOriginalMovies()
  }

  renderTopRatedLoader = () => (
    <div className="top-rated-loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        className="top-rated-loader"
      />
    </div>
  )

  renderTopRatedSuccess = () => (
    <div className="top-rated-slider">
      <h1 className="top-rated-now-heading">Popular</h1>
      <div className="top-rated-slick-container">{this.renderSlider()}</div>
    </div>
  )

  renderTopRatedFailure = () => (
    <div className="top-rated-loader-container">
      <img
        src="https://res.cloudinary.com/duezhxznc/image/upload/v1677144753/alert-triangle_ubtgex.png"
        alt="failure"
        className="trending-failure-view"
      />
      <p className="trending-failure-view-name">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="trending-failure-button"
        onClick={this.onRefreshOriginalMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderTopMovies = () => {
    const {movieTopRatedStatus} = this.state

    switch (movieTopRatedStatus) {
      case movieApiTopRatedStatus.inProgress:
        return this.renderTopRatedLoader()
      case movieApiTopRatedStatus.success:
        return this.renderTopRatedSuccess()
      case movieApiTopRatedStatus.failure:
        return this.renderTopRatedFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderTopMovies()
  }
}

export default TopRatedMovies
