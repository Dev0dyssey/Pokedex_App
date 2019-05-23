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
      <>
      <div className = "container">
      <div className = "card">
          <img 
            className="card-img-top" 
            src= {this.state.imageUrl}
            style = {{height: "150px", width: "150px"}}
            alt = "Pokemon" />
          <div className="card-body">
            <h3 className = "card-title">{this.state.name}</h3>
            <br/>
            <div className="card-text">
              <h2>Abilities</h2>
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
        </>
    )
  }
}
