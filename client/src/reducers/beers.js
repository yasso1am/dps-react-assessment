import axios from 'axios'
const GET_BEERS = 'GET_BEERS'

// export const getBeers = (page) => {
//   let select = this.page
//   return (dispatch) => {
//     axios.get('/api/all_beers?page=${select}&per_page=12')
//       .then(res => 
//         dispatch({type: GET_BEERS, beers: res.data.entries}) )
//   }
// }

export default (state = [], action) => {
  switch(action.type) {
    case GET_BEERS:
      return action.beers
    default:
      return state
  }
}
