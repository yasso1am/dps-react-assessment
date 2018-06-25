import React from 'react';
import axios from 'axios';
import {
  Grid,
  Dimmer,
  Loader,
  Segment,
  Divider,
  Header,
  Image,
  Container,
} from 'semantic-ui-react';
import styled from 'styled-components'



const stockImage = 'https://www.goodfreephotos.com/albums/vector-images/beer-vector-art.png'

const ButtonLink = styled.a`
  float: left;
  padding: 10px 30px;
  border-radius: 10px;
  color: black;
  background-color: white;
`


class BeerView extends React.Component {
  state = { beer: {}, loading: true }

  componentDidMount() {
    const {id} = this.props.match.params
    axios.get(`/api/beer/${id}`)
      .then(res => {
        this.setState({beer: res.data.entries[0]})
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

  // FUNCTIONS TO HELP DISPLAY BEERS
  beerName = (beer) => {
    return (
      beer.name ? <Header textAlign='center' as="h2" color='yellow'>{beer.name}</Header> : <Header textAlign='center' as="h2" color='yellow'>Beer Name Unavailable</Header>
    )}
  
  beerLabel = (beer) => {
    return (
      beer.labels ? <Image centered size='large' src={beer.labels.large} /> : <Image centered size='large' src={stockImage} />
    )}

  beerStyle = (beer) => {
    const style = beer.style
    if (typeof style === "undefined")
      return  <p> No style at all </p>
    else
    return (
      style.name ?  <Header  as="h3" textAlign='right' color='yellow'> {style.name} </Header>  :   <Header as="h3" color='yellow'> 'I am beer' </Header> 
    )}

  beerAbv = (beer) => {
    return(
      beer.abv ? <Header as="h3" textAlign='right' color='yellow'> ABV: {beer.abv}</Header> : <Header as="h3" color='yellow'> ABV: Unavailable </Header>
    )
  }
  
  beerDescription = (beer) => {
    return(
      beer.description ? <p> {beer.description} </p> : <p> No description available </p>
    )
  }

  //WHAT IS BEING RENDERED ON THE PAGE
      render() {
        if (this.state.loading) {
          return (
            <Container>
               {this.nowLoading()}
            </Container>
          )
        } else {
      const { beer }  = this.state
      return (
        <Container>
          <Divider /> 
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    { this.beerName(beer) }
                    { this.beerDescription(beer)}
                    { this.beerStyle(beer) }
                    { this.beerAbv(beer) }
                  </Grid.Column>
                  <Grid.Column width={8}>
                    { this.beerLabel(beer) }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <ButtonLink
                href={'http://localhost:3000/beers'}
                rel="noopener norefferer"
                >
                Back
                </ButtonLink>
        </Container>
      )
    }
  }
}

export default BeerView