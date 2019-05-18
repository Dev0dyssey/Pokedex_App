import React from 'react';
import Axios from 'axios';

class PokemonList extends React.Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        type: ''
    }

    componentDidMount(){
        const { name, url } = this.props
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        // const imageUrl = `https://github.com/PokeAPI/sprits/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`

        this.pokeType();

        this.setState({
            name, 
            imageUrl, 
            pokemonIndex,
        });
    }

    pokeType = async () => {
        const response = await Axios.get(this.props.url);
        console.log(response.data.types[0].type.name);
        this.setState({
            type: response.data.types[0].type.name
        })
    }

    render(){
        

        return(
            <div className = "ui card">
                <div className="image">
                    <img src= {this.state.imageUrl} alt="pokemon"/>
                </div>
                <div className = "content">
                    <div className = "header">
                        <div>{this.state.pokemonIndex}</div>
                    </div>
                    <div className = "meta">
                        <div>{this.state.name}</div>
                        <div>{this.state.type}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonList;