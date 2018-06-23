import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import Beers from './Beers'

// import { getBeers } from '../reducers/beers'

class FetchBeers extends React.Component { 

  // componentDidMount() {
  //   this.props.dispatch(getBeers(5))
  // }

  render() {
      return(
        <div>
          <Route exact path="/beers" component={Beers} />
        </div>
      )   
  }
}

export default connect()(FetchBeers)