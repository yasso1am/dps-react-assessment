import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
import styled from 'styled-components'


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
  state = { beers: [] }

  componentDidMount() {
    this.getBeers(this.props)
  }

  getBeers = (props, page = 1) => {
    const { dispatch } = this.props
    const url = `/api/all_beers/?page=${page}&per_page=10`
      axios.get(url)
        .then(res => {
         this.setState( {beers: res.data.entries} ) 
        })
  }
  

  label = (beer) => (
    <Image centered size='tiny' src={beer.labels.medium} />
  )

  displayBeers = () => {
    const { beers } = this.state;
    return beers.map(beer => {
      return (
        <StyledCard key={beer.id}>
          {beer.labels ? this.label(beer) : <Image centered size="tiny" src={stockImage} /> }
          <Card.Content>
            <Card.Header>{beer.name}</Card.Header>
            <Card.Meta> ABV: {beer.abv}</Card.Meta>
            <Card.Meta> {beer.style.name} </Card.Meta>
          </Card.Content>
          <Truncated>
          {/* <Card.Description>
            { beer.description }
          </Card.Description> */}
          </Truncated>
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
    return (
      <div>
      <Container>
      <Divider />
        <Header as="h2" textAlign="center" color="yellow">Beers</Header>
        <Divider />
        <Card.Group itemsPerRow={5}>
          { this.displayBeers() }
        </Card.Group>
      </Container>
      </div>
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
