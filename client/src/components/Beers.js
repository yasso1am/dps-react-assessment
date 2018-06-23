import React from 'react'
import axios from 'axios'
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
  state = { beers: [] }

  componentDidMount(){
    axios.get('/api/all_beers')
      .then( res => this.setState({ beers: res.data.entries }) )
  }

  displayBeers = () => {
    const {beers} = this.state;
    return beers.map(beer => {
      return (
        <Card key={beer.name}>
          <Card.Content>
            <Card.Header>{beer.name}</Card.Header>
            <Card.Meta> ABV: {beer.abv}</Card.Meta>
          </Card.Content>
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












export default Beers

