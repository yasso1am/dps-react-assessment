import React from 'react';
import {Input} from 'semantic-ui-react';


class SearchEngine extends React.Component {
  state = {term: ''}

  onChange(term) {
    this.props.onSearch(term)
    this.setState( {term} )
  }

  render() {
    return (
      <Input 
          fluid
          focus
          value={this.state.term}
          onChange={e => this.onChange(e.target.value)}
          placeholder='Search for a beer'
        />
    );
  }
}





export default SearchEngine