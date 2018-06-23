import React from 'react'
import axios from 'axios'
// import { getBeers } from '../reducers/beers'
import {setFlash} from '../actions/flash';
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
  state = { beers: [] }

  componentDidMount() {
    this.getBeers(this.props)
  }

  getBeers = (props, page = 1) => {
    const { dispatch } = this.props
      axios.get('/api/all_beers?page=1&per_page=12')
        .then(res => {
         this.setState( {beers: res.data.entries} ) 
        })
  }
  
  
  label = (beer) => (
    <Image centered size='large' src={beer.labels.large} />
  )

  displayBeers = () => {
    const { beers } = this.state;
    debugger
    return beers.map(beer => {
      return (
        <Card key={beer.id}>
          {beer.labels ? this.label(beer) : <Image centered size="small" src={stockImage} /> }
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






// const mapStateToProps = (state) => {
//   const { beers } = state
//   return {
//     beers,
//   }
// }

export default connect()(Beers)

const stockImage = 'https://www.goodfreephotos.com/albums/vector-images/beer-vector-art.png'
