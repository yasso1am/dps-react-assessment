import axios from 'axios'
const GET_BEERS = 'GET_BEERS'

export const getBeers = () => {
  return (dispatch) => {
    axios.get('/api/all_beers')
      .then(res => 
        dispatch({type: GET_BEERS, beers: res.data.entries}) )
  }
}

export default (state = [], action) => {
  switch(action.type) {
    case GET_BEERS:
      return action.beers
    default:
      return state
  }
}
