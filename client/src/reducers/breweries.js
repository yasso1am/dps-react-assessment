import axios from 'axios'
const BREWERIES = 'BREWERIES'

export const getBreweries = () => {
  return (dispatch) => {
    axios.get('/api/all_breweries')
      .then(res => 
        dispatch({type: BREWERIES, breweries: res.data.entries}) )
  }
}

export default (state = [], action) => {
  switch(action.type) {
    case BREWERIES:
      return action.breweries
    default:
      return state
  }
}
