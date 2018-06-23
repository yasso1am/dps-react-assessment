import React from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'
import '../styles/index.css'
import styled from 'styled-components'

class SearchEngine extends React.Component {
  state = {query: ''}

  onChange(query) {
    this.setState({query})
    this.props.o
  }
}

  search = () => {
    const regex = new RegExp(this.searchTerm.value.toLowerCase())
    const { beers } = this.state;
    if (this.searchTerm.value === '') {
      this.setState({ visible: repos })
    } else {
      const visible = repos.filter( r => regex.test(r.full_name.toLowerCase()))
      this.setState({ visible })
    }
  }

export default SearchEngine