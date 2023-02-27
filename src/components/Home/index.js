import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import TrendingMovies from '../TrendingMovies'
import OriginalMovies from '../OriginalMovies'
import TopRatedMovies from '../TopRatedMovies'
import RandomMovie from '../RandomMovie'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header boolValue="false" />
    <RandomMovie />
    <h1 className="trending-now-heading">Trending Now</h1>
    <TrendingMovies />
    <TopRatedMovies />
    <h1 className="original-now-heading">Originals</h1>
    <OriginalMovies />

    <div className="contact-icons-container">
      <FaGoogle className="home-google-icon home-google" />
      <FaTwitter className="home-google-icon home-twitter" />
      <FaInstagram className="home-google-icon home-instagram" />
      <FaYoutube className="home-google-icon home-facebook" />
    </div>
    <p className="home-contact-heading">Contact us</p>
  </div>
)

export default Home
