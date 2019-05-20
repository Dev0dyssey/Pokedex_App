import React, { Component } from 'react'

export default class PokemonData extends Component {
  state = {name: ''}

  componentDidMount() {
    const { name } = this.props.location.state
    this.setState({ name });
  }


  render() {
    return (
      <div>
        {this.state.name}
      </div>
    )
  }
}
