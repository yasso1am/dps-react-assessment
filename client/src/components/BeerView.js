import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {
  Segment,
  Header,
  Image,
  Container,
  Grid,
  Button
} from 'semantic-ui-react';


const stockImage = 'https://www.goodfreephotos.com/albums/vector-images/beer-vector-art.png'


class BeerView extends React.Component {
  state = { beer: {} }

  componentDidMount() {
    const {id} = this.props.match.params
    debugger
    axios.get(`/api/beer/${id}`)
      .then(res => {
        this.setState({beer: res.data.entries[0]})
      })
  }

  //FUNCTIONS TO HELP DISPLAY BEERS
  // beerName = (beer) => {
  //   return (
  //     beer.name ? <Header>{beer.name}</Header> : <CHeader>No Name<Header>
  //   )}
  
  beerLabel = (beer) => {
    return (
      beer.labels ? <Image centered size='large' src={beer.labels.large} /> : <Image centered size='large' src={stockImage} />
    )}

  // beerStyle = (beer) => {
  //   const style = beer.style
  //   if (typeof style === "undefined")
  //     return <Card.Meta> No style at all </Card.Meta>
  //   else
  //   return (
  //     style.name ? <Card.Meta> {style.name} </Card.Meta> : <Card.Meta> I am beer </Card.Meta> 
  //   )}

  // beerAbv = (beer) => {
  //   return(
  //     beer.abv ? <Card.Meta> ABV: {beer.abv}</Card.Meta> : <Card.Meta> Unknown </Card.Meta>
  //   )
  // }

      render() {
      const { beer }  = this.state
      return (
        <Segment >
            { this.beerLabel(beer)}
        </Segment>
      )
  }
}


const defaultImage = 'http://pickledwig.com/wp-content/themes/directorypress/thumbs/na.gif'

export default BeerView