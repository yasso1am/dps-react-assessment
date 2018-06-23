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



const StyledCard = styled(Card)`
  height: 250px;
`

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

class Beers extends React.Component {
  state = { beers: [], page: 1, hasMore: true }

  componentDidMount() {
    this.getBeers(this.props)
  }

 
  getBeers = (props, page = 1) => {
    const url = `/api/all_beers/?page=${page}&per_page=10`
      axios.get(url)
        .then(res => {
          const data  = res.data
            if (data.total_pages === page) {
            this.setState({ beers: [...this.state.beers, ...data.entries], total_pages: data.total_pages, hasMore: false })
          } else {
            this.setState({beers: [...this.state.beers, ...data.entries], page: this.state.page + 1 } )
          }
      })
  }

  loadMore = () => {
    const page = this.state.page
    this.getBeers(this.props, page)
   }

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
    debugger
    // I have an error here when a beer.style.name is undefined I can't seem to manage it! //
    // I fixed it! I was checking if beer.style.name was undefined, I just needed to check if beer.style was undefined
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

  render() {
    const { page, hasMore } = this.state
    return (
      <Segment inverted>
        <Divider />
          <Header as="h2" textAlign="center" color="yellow">Beers</Header>
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






// const mapStateToProps = (state) => {
//   const { beers } = state
//   return {
//     beers,
//   }
// }

export default connect()(Beers)

const stockImage = 'https://www.goodfreephotos.com/albums/vector-images/beer-vector-art.png'
