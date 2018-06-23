import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { getBeers } from '../reducers/beers'
// import {setFlash} from '../actions/flash';
import { connect } from 'react-redux'
import {
  Segment,
  Container, 
  Header,
  Card,
  Image,
  // Dropdown,
  Divider,
  // Button,
} from 'semantic-ui-react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import SearchEngine from './SearchEngine'


//STYLEDCOMPONENTS

const stockImage = 'https://www.goodfreephotos.com/albums/vector-images/beer-vector-art.png'

const StyledCard = styled(Card)`
  height: 250px;
`



class Beers extends React.Component {
  state = { beers: [], page: 1, hasMore: true, visible: [], search: '' }

  //LIFECYCLE METHOD
  componentDidMount() {
    this.getBeers(this.props)
  }

  //AXIOS GETS BEERS AS LONG AS THERE ARE BEERS TO GET, 10 BEERS AT A TIME
  getBeers = (props, page = 1) => {
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
      }
  
  //LOADS MORE BEERS
  loadMore = () => {
    const page = this.state.page
    this.getBeers(this.props, page)
    }

  //LIVE SEARCH OF BEERS INCLUDING AXIOS CALL/QUERY      
  search = (term) => {
    const {dispatch} = this.props;
      axios.get(`/api/search_beers?query=${term}`)
        .then(res => {
          this.setState({beers: res.data.entries})
        });
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
            <Link to={`/beers/${beer.id}`}>
              View Beer
           </Link>
          </Card.Content>
        </StyledCard>
      );
    });
  }

  //WHAT IS ACTUALLY BEING RENDERED ON THE PAGE
  render() {
    const { page, hasMore } = this.state
    return (
      <Segment inverted>
        <Divider />
          <Header as="h2" textAlign="center" color="yellow">Beers</Header>
          <SearchEngine onSearch={this.search} />
          <Divider />
        <Container style={{height: '100vh', overflowY:'scroll', overflowX:'hidden'}}>
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
        </Container>
      </Segment>
    )
  }
}

export default connect()(Beers)

