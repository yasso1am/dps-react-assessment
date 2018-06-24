// import axios from 'axios'
// import { setFlash } from '../actions/flash'
// const BREWERIES = 'BREWERIES'

// // export const getBreweries = () => {
// //   return (dispatch) => {
// //     axios.get('/api/all_breweries')
// //       .then(res => 
// //         dispatch({type: BREWERIES, breweries: res.data.entries}) )
// //   }
// // }

// // export const getBreweries = (props, page = 1) => {
// //   return (dispatch) => {
// //   const url = `/api/all_beers/?page=${page}&per_page=10`
// //     axios.get(url)
// //       .then(res => {
// //         const data  = res.data
// //           if (data.total_pages === page) {
// //             dispatch({ breweries: [...this.props.breweries, ...data.entries], total_pages: data.total_pages, hasMore: false }) 
// //           } else {
// //             dispatch({ breweries: [...this.state.breweries, ...data.entries], page: this.state.page + 1 } )
// //           }
// //         })
// //         .catch(error => {
// //           dispatch(setFlash('Where did the beers go? Please try again later!'))
// //         })
// //       }
// //   }


// export default (state = [], action) => {
//   switch(action.type) {
//     case BREWERIES:
//       return action.breweries
//     default:
//       return state
//   }
// }
