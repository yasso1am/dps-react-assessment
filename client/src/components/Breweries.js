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
  Dimmer,
  Loader,
  Divider,
} from 'semantic-ui-react'
import styled from 'styled-components'
import SearchEngine from './SearchEngine'


//STYLED COMPONENTS
const StyledCard = styled(Card)`
  height: 300px;
`

const Truncated = styled.div`
  width: 175px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const stockImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Glendronach_pot_stills.jpeg/1280px-Glendronach_pot_stills.jpeg'

//CLASS STARTS
class Breweries extends React.Component {
  state = { breweries: [], page: 1, hasMore: true, visible: [], search: '', loading: true}

  //LIFECYCLE METHOD
  componentDidMount() {
    this.getBreweries(this.props)
  }

  //GET 10 BREWERIES AT A TIME AS LONG AS THERE ARE BREWERIES TO GET
  getBreweries = (props) => {
    const { page } = this.state
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
          }).then( () => {
            this.setState({ loading: false })
          })
        }
  
  //INCREMENT PAGE AND CALL GETBREWERIES
  loadMore = () => {
    // this.setState( {appLoad: true })
    const page = this.state.page
    this.getBreweries(this.props, page)
    }

  //STYLING MY DIMMER DURING INITIAL LOADING
  initialLoading = () => {
    return ( 
      <Dimmer active style= { { height: '700px' } }>
         <Loader size="huge"> Loading </Loader>
      </Dimmer>
     )
   }

  //  //STYLING LOADER DURING SCROLLING
  //  moreBreweriesLoader = () =>{
  //   const {brewLoad} = this.state
  //   if (brewLoad)
  //   return
  //     <Loader size="huge" active />
  //  }

  //LIVE SEARCH OF BREWERIES
  search = (term) => {
      axios.get(`/api/search_breweries?query=${term}`)
      .then(res => {
        this.setState({breweries: res.data.entries})
      })
    }

    //FUNCTIONS TO HANDLE DISPLAYING BREWERIES
    breweryImage = (brewery) => {
      return (
        brewery.images ? <Image centered size='large' src={brewery.images.large} /> : <Image centered size='tiny' src={stockImage} />
      )}

    breweryWebsite = (brewery) => {
      if (brewery.website){
      return <Card.Meta>
                <Truncated>
                  <a 
                    href={`${brewery.website}`}
                    target="_blank"
                    rel="noopener norefferer"
                    >
                     {brewery.website}
                  </a>
                </Truncated>
            </Card.Meta>
      } else {
        return <Card.Meta>
                No Website Available
              </Card.Meta>
        }
    }

    //BUILDING THE LOOK OF THE BREWERIES
    displayBreweries = () => {
      const {breweries} = this.state
      return breweries.map( (brewery, i) => {
        return (
          <StyledCard key={i}>
          <Card.Content>
            {this.breweryImage(brewery)}
          <Divider/>
          <Card.Header >{brewery.name}</Card.Header>
            {this.breweryWebsite(brewery)}
          </Card.Content>``
          <Card.Content extra>
          </Card.Content>
        </StyledCard>
      );
    });
  }
  
  //MANIFEST OF WHAT IS GETTING LISTED ON PAGE
  render() {
    const { page, hasMore, loading } = this.state
    if (loading) {
      return (
        <Container>
           {this.initialLoading()}
        </Container>
      )
    } else {
    return (
      <Segment inverted>
        <Divider />
          <Header as="h2" textAlign='center' color="yellow">Breweries</Header>
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
            { this.displayBreweries() }
          </Card.Group>
            {/* { this.moreBreweriesLoader() } */}
          </InfiniteScroll>
        </Container>
      </Segment>
      )
    }
  }
}

export default connect()(Breweries)


