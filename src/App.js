import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import UserDetailsChecking from './components/UserDetailsChecking'
import './App.css'
import Home from './components/Home'
import Popular from './components/Popular'
import SearchMovieRouter from './components/SearchMovieRouter'
import AccountRouter from './components/AccountRouter'
import MovieDetailRouter from './components/MovieDetailRouter'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <UserDetailsChecking exact path="/" component={Home} />
    <UserDetailsChecking exact path="/popular" component={Popular} />
    <UserDetailsChecking exact path="/search" component={SearchMovieRouter} />
    <UserDetailsChecking exact path="/account" component={AccountRouter} />
    <UserDetailsChecking
      exact
      path="/movies/:id"
      component={MovieDetailRouter}
    />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
