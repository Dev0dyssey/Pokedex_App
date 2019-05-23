import React, { Component } from 'react'
import allpokes from '../api/pokedex';
import PokemonList from './PokemonList';

export default class PokemonMain extends Component {
    state = { 
        pokelist: null,
        name: ' ',
        search: ''
    }

    componentDidMount() {
        this.listPokes();
    }

    listPokes = async ()  => {
        const response = await allpokes.get('/pokemon/?limit=811');
        // Pass all the results of the api call into the state object
        // Results array = taken from pokeAPI when looking at the response object to a query
        this.setState({ pokelist: response.data['results'] })

        const names = response.data.results.map((name) => {
            return name.name
        })

        this.setState({ name: names})

        console.log(this.state.name);
    };

    pokemonFilter = (e) => {
        let updateName = this.state.name;
        updateName = updateName.filter((item => {
            return item.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        }));

        this.setState({search: updateName});
    }

    render() {
        return (
            <>
                <div className = "container">
                {/* Ternery check whether the state exists or is still being loaded by the API */}
                {this.state.pokelist ? (
                    <div className="row">
                        {/* Map over the state object and return a new component for each listed item in the list */}
                        {this.state.pokelist.map(pokemon =>(
                            // The property value is taken from the map function (pokemon) NOT the state object
                            // Do not do name = {this.state.pokelist.name}!!!
                            <PokemonList
                                key={pokemon.name} 
                                name = {pokemon.name}
                                url = {pokemon.url}
                            />
                        ))}
                    </div>
                ) : (
                    <h1>Loading Data!</h1>
                )}
            </div>
            </>
        );
    }
}
