import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import TopBar from './components/layout/TopBar'
import EventsList from './components/events/EventsList'
import EventDetailsContainer from './components/events/EventDetailsContainer'
import EventsListContainer from './components/events/EventsListContainer';
import CreateEventFormContainer from './components/events/CreateEventFormContainer'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventsListContainer} />
            <Route exact path="/form" exact component={CreateEventFormContainer} />
            <Route exact path="/events/:id" component={EventDetailsContainer} />
            <Route exact path="/" render={ () => <Redirect to="/events" /> } />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;


{/* <Route exact path="/events/:id" component={EventDetails} /> */}