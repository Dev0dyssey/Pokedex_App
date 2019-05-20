import React, { Component } from 'react'

export default class PokemonData extends Component {
  state = {
      name: '',
      height: '',
      weight: '',
    }

  componentDidMount() {
    const { name, height, weight } = this.props.location.state
    this.setState({ name, height, weight });
  }


  render() {
    return (
      <div>
        {this.state.name}
        {this.state.height}
        {this.state.weight}
      </div>
    )
  }
}
