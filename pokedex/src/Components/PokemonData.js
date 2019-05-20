import React, { Component } from 'react'
import evolution from '../api/pokedex';
import Axios from 'axios'

export default class PokemonData extends Component {
  state = {
      name: '',
      height: '',
      weight: '',
      imageUrl: '',
      pokemonIndex:'',
      abilities: '',
      evolvedInto: ''
    }

  componentDidMount() {
    const { name, height, weight, imageUrl, pokemonIndex, abilities } = this.props.location.state
    this.setState({ name, height, weight, imageUrl, pokemonIndex, abilities });

    this.evolutionData();
  }

  evolutionData = async() => {
    // const evolutionDetails = await evolution.get(`evolution-chain/${this.state.pokemonIndex}/`)
    const response = await Axios.get(`https://pokeapi.co/api/v2/evolution-chain/1/`)
    const evolvedInto = response.data.chain.evolves_to[0].species.name;

    this.setState({
      evolvedInto
    })

    console.log(response.data.chain.evolves_to[0].species.name);
  }
  

  render() {
    return (
      <div className="ui items">
        <div className="item">
          <div className="image">
            <img src={this.state.imageUrl} alt = "Pokemon" />
          </div>
          <div className="content">
            <span className="header">{this.state.name}</span>
            <div className="meta">
              <span>Abilities</span>
            </div>
            <div className="description">
              <p>{this.state.abilities}</p>
            </div>
            <div className="extra">
              Evolution: {this.state.evolvedInto}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
