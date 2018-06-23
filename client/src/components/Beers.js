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

class Beers extends React.Component {

  displayBeers = () => {
    const {beers} = this.props;
    debugger
    return beers.map(beer => {
      return (
        <Card key={beer.id}>
        
          {/* <Image size='large' src={beer.labels.large} /> */}
          <Card.Content>
            <Card.Header>{beer.name}</Card.Header>
            <Card.Meta> ABV: {beer.abv}</Card.Meta>
          </Card.Content>
          <Card.Description>
            { beer.description }
          </Card.Description>
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
          { this.displayBeers() }
        </Card.Group>
      </Container>
    )
  }
}






const mapStateToProps = (state) => {
  const { beers } = state
  return {
    beers,
  }
}

export default connect(mapStateToProps)(Beers)

