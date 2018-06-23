import React from 'react';
import {Button, Input, Segment} from 'semantic-ui-react';
import styled from 'styled-components';

  
const Search = styled(Input) `
  background-color: black !important;
  color: white !important;
`
const Bar = styled(Segment) `
    background-color: black !important;
  color: white !important;
`

class SearchEngine extends React.Component {
  state = {term: ''}

  onChange(term) {
    this.props.onSearch(term)
    this.setState( {term} )
  }

  render() {
    return (
      <Bar basic textAlign='center'>
        <Search
          fluid
          focus
          value={this.state.term}
          onChange={e => this.onChange(e.target.value)}
          placeholder='Search for a beer'
        />
      </Bar>
    );
  }
}





export default SearchEngine