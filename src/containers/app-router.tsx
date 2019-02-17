import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppContainer from './app-container'

const AppRouter: React.FC = () => (
  <Router>
    <Route path="/" component={AppContainer} />
  </Router>
)

export default AppRouter
