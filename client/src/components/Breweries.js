import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {setFlash} from '../actions/flash'
import InfiniteScroll from 'react-infinite-scroller'
import {
  Segment,
  Container, 
  Header,
  Card,
  Image,
  Divider,
} from 'semantic-ui-react'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  height: 300px;
`

class Breweries extends React.Component {
  state = { breweries: [], page: 1, hasMore: true, visible: [], search: '' }

  componentDidMount() {
    this.getBreweries(this.props)
  }

  getBreweries = (props, page = 1) => {
    const { dispatch } = this.props
    const url = `/api/all_breweries/?page=${page}&per_page=10`
      axios.get(url)
        .then(res => {
          const data  = res.data
            if (data.total_pages === page) {
              this.setState({ breweries: [...this.state.breweries, ...data.entries], total_pages: data.total_pages, hasMore: false }) 
            } else {
              this.setState({ breweries: [...this.state.breweries, ...data.entries], page: this.state.page + 1 } )
            }
          })
          .catch(error => {
            dispatch(setFlash('Where did the beers go? Please try again later!'))
          })
        }
  
  loadMore = () => {
    const page = this.state.page
    this.getBreweries(this.props, page)
    }

  search = (term) => {
    const {dispatch} = this.props;
      axios.get(`/api/search_breweries?query=${term}`)
      .then(res => {
        this.setState({breweries: res.data.entries})
      })
      .catch( error => {
        dispatch(setFlash('Your brewery does not seem to exist! Search again') )
      })
    }

    
    image = (brewery) => {
      return (
        <Image centered size='large' src={brewery.images.large} />
      )
    }

    displayBreweries = () => {
      const { page, hasMore } = this.state
      const {breweries} = this.state
      return breweries.map(brewery => {
        return (
          <StyledCard key={brewery.id}>
          <Card.Content>
          {brewery.images ? this.image(brewery) : <Image centered size='small' src={stockImage} />}
            <Card.Header>{brewery.name}</Card.Header>
            <Card.Meta>{brewery.website}</Card.Meta>
          </Card.Content>
          {/* <Card.Description>
            { beer.description }
          </Card.Description> */}
          <Card.Content extra>
            {/* <Link to={`/beers/${beer.name}`}> */}
              {/* View */}
            {/* </Link> */}
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
          <Header as="h2" textAlign="center" color="yellow">Breweries</Header>
        <Divider />
        <Container style={{height: '100vh', overflowY:'scroll', overflowX:'hidden'}}>
        <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={hasMore}
            useWindow={false}
          >
          <Card.Group itemsPerRow={5}>
            { this.displayBreweries() }
          </Card.Group>
          </InfiniteScroll>
        </Container>
      </Segment>
    )
  }
}






const mapStateToProps = (state) => {
  const { breweries } = state
  return {
    breweries,
  }
}


export default connect(mapStateToProps)(Breweries)


const stockImage = 'https://upload.wikimedia.org/wikipedia/commons/9/91/Logo_bi%C3%A8re.svg'