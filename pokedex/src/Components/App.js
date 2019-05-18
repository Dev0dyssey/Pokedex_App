import React from 'react';
import allpokes from '../api/pokedex';
import PokemonList from './PokemonList';

import '../CSS/pokemon.css';

class App extends React.Component {
    state = { pokelist: null }

    componentDidMount() {
        this.listPokes();
    }

    listPokes = async ()  => {
        const response = await allpokes.get('/pokemon/?limit=811');
        // Pass all the results of the api call into the state object
        // Results array = taken from pokeAPI when looking at the response object to a query
        this.setState({ pokelist: response.data['results'] })
        console.log(this.state.pokelist);
    };

    render() {
        return (
            <>
                {/* Ternery check whether the state exists or is still being loaded by the API */}
                {this.state.pokelist ? (
                    <div>
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
            </>
        );
    }
}

export default App;