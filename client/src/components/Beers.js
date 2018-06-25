import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {setFlash} from '../actions/flash'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import {
  Segment,
  Loader,
  Dimmer,
  Container, 
  Header,
  Card,
  Image,
  Divider,
} from 'semantic-ui-react'

import SearchEngine from './SearchEngine'


//STYLED COMPONENTS
const stockImage = 'https://www.goodfreephotos.com/albums/vector-images/beer-vector-art.png'

const StyledCard = styled(Card)`
  height: 250px;
`

//CLASS STARTS
class Beers extends React.Component {
  state = { beers: [], page: 5, hasMore: true, visible: [], search: '', loading: true}

  //LIFECYCLE METHOD
  componentDidMount() {
    this.getBeers(this.props)
  }

  //AXIOS GETS BEERS AS LONG AS THERE ARE BEERS TO GET, 10 BEERS AT A TIME
  getBeers = (props, page = 5) => {
    const { dispatch } = this.props
    const url = `/api/all_beers/?page=${page}&per_page=10`
    axios.get(url)
      .then(res => {
        const data  = res.data
          if (data.total_pages === page) {
            this.setState({ beers: [...this.state.beers, ...data.entries], total_pages: data.total_pages, hasMore: false }) 
          } else {
            this.setState({ beers: [...this.state.beers, ...data.entries], page: this.state.page + 1 } )
          }
        })
        .catch(error => {
          dispatch(setFlash('Where did the beers go? Please try again later!'))
        }).then( () => {
          this.setState( {loading: false} )
        })
      }
    
  //STYLING MY DIMMER DURING LOADING
  nowLoading = () => {
    return ( 
      <Dimmer active style= { { height: '700px' } }>
         <Loader size="huge"> Loading </Loader>
       </Dimmer>
     )
   }
   
  //  //STYLING LOADER DURING SCROLLING
  //  moreBeerLoader = () =>{
  //    const {beerLoad} = this.state
  //     if (beerLoad)
  //       return (
  //       <Dimmer active inverted>
  //         <Loader size="huge" active />
  //       </Dimmer>
  //       )
  //  }
   
  //LOADS MORE BEERS
  loadMore = () => {
      const page = this.state.page
        this.getBeers(this.props, page)
    }

  //LIVE SEARCH OF BEERS INCLUDING AXIOS CALL/QUERY      
  search = (term) => {
      axios.get(`/api/search_beers?query=${term}`)
        .then(res => {
          this.setState({beers: res.data.entries})
        })
      }

  //FUNCTIONS TO HELP DISPLAY BEERS
  beerName = (beer) => {
    return (
      beer.name ? <Card.Header>{beer.name}</Card.Header> : <Card.Header>No Name</Card.Header>
    )}
  
  beerLabel = (beer) => {
    return (
      beer.labels ? <Image centered size='tiny' src={beer.labels.medium} /> : <Image centered size='tiny' src={stockImage} />
    )}

  beerStyle = (beer) => {
    const style = beer.style
    if (typeof style === "undefined")
      return <Card.Meta> No style at all </Card.Meta>
    else
    return (
      style.name ? <Card.Meta> {style.name} </Card.Meta> : <Card.Meta> I am beer </Card.Meta> 
    )}

  beerAbv = (beer) => {
    return(
      beer.abv ? <Card.Meta> ABV: {beer.abv}</Card.Meta> : <Card.Meta> Unknown </Card.Meta>
    )
  }

  //BUILDING THE LOOK OF A BEER CARD
  displayBeers = () => {
    const { beers } = this.state;
    return beers.map( (beer, i) => {
      return (
        <StyledCard key={i}>
          { this.beerLabel(beer) }
          <Card.Content>
            { this.beerName(beer) }
            { this.beerAbv(beer) }
            { this.beerStyle(beer)}
          </Card.Content>
          <Card.Content extra>
            <Link 
              to={`/beers/${beer.name}`}
              >
              View Beer
           </Link>
          </Card.Content>
        </StyledCard>
      );
    });
  }

  //WHAT IS ACTUALLY BEING RENDERED ON THE PAGE - violation on scroll in console but works
  render() {
    const { page, hasMore, loading } = this.state
    if (loading) {
      return (
        <Container>
         {this.nowLoading()}
        </Container>
      )
    } else {
    return (
      <Segment inverted>
        <Divider />
          <Header as="h2" textAlign="center" color="yellow">Beers</Header>
          <SearchEngine onSearch={this.search} />
          <Divider />
        <Container style={{height: '100vh', overflowY:'scroll', overflowX:'hidden'}}>
        {/* scroll is throwing a violation in the console and wants me to mark handler as passive, but I don't know what this is  */}
          <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={hasMore}
            useWindow={false}
          >
          <Card.Group itemsPerRow={5}>
            { this.displayBeers() }
          </Card.Group>
          </InfiniteScroll>
           {/* { this.moreBeerLoader() } */}
        </Container>
      </Segment>
      )
    }
  }
}

export default connect()(Beers)

