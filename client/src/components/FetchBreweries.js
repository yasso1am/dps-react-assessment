import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import Breweries from './Breweries'


import { getBreweries } from '../reducers/breweries'

class FetchBreweries extends React.Component { 

  componentDidMount() {
    this.props.dispatch(getBreweries())
  }

  render() {
      return(
        <div>
          <Route exact path="/breweries" component={Breweries} />
        </div>
      )   
  }
}

export default connect()(FetchBreweries)