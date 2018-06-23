import React from 'react'
// import axios from 'axios'
import { connect } from 'react-redux'
import {
  Container, 
  Header,
  Card,
  Image,
  Dropdown,
  Divider,
  Button,
} from 'semantic-ui-react'



class Breweries extends React.Component {
  
  image = (brewery) => {
    return (
      <Image size='medium' src={brewery.images.medium} />
    )
  }
  
  displayBreweries = () => {
    const {breweries} = this.props;
    return breweries.map(brewery => {
      return (
        <Card key={brewery.id}>
          <Card.Content>
          {brewery.images ? this.image(brewery) : <Image src={stockImage} />}
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
        </Card>
      );
    });
  }
  
  
  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Beers</Header>
        <Divider />
        <Card.Group itemsPerRow={5}>
          { this.displayBreweries() }
        </Card.Group>
      </Container>
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


const stockImage = 'https://www.goodfreephotos.com/albums/vector-images/beer-vector-art.png'