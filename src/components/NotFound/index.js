import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/duezhxznc/image/upload/v1677082148/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_pzleng.png"
      alt="not found"
      className="not-found-image-sm"
    />
    <img
      src="https://res.cloudinary.com/duezhxznc/image/upload/v1677083503/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_1_mtqjy5.png"
      alt="not found"
      className="not-found-image-lg"
    />
    <h1 className="not-found-heading">Lost Your Way ?</h1>
    <p className="not-found-description-lg">
      we are sorry, the page you requested could not be found <br />
      Please go back to the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Go to Home
      </button>
    </Link>
  </div>
)
export default NotFound
