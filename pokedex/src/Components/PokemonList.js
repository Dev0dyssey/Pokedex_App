import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class PokemonList extends React.Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        types: '',
        species: '',
        height: '',
        weight: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        abilities: ''
    }

    componentDidMount(){
        const { name, url } = this.props
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        // const imageUrl = `https://github.com/PokeAPI/sprits/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`

        this.pokeData();

        this.setState({
            name, 
            imageUrl, 
            pokemonIndex,
        });


    }

    // Arrow function holding the code to gather all Pokemon data from PokeAPI
    pokeData = async () => {
        const response = await Axios.get(this.props.url);

        // Declare variables to hold the stat information
        let { hp, attack, defense, speed, specialAttack, specialDefense } = ''

        response.data.stats.map(stat => {
            // Map over the stats array and assign values through the switch statement
            // eslint-disable-next-line default-case
            switch(stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;  
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;                  
            }
        })

        // Pokemon physical data
        const height = response.data.height;
        const weight = response.data.weight;
        const types = response.data.types.map(type => type.type.name);

        const abilities = response.data.abilities.map(ability => {
            return ability.ability.name
        });

        this.setState({
            types,
            height,
            weight,
            stats: {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            },
            abilities
        });
    }

    render(){
        // Deconstruct the state object to reduce the number of repeat this.state declarations
        const { hp, attack, defense, speed, specialAttack, specialDefense } = this.state.stats;
        const { name, pokemonIndex, imageUrl, types, height, weight, abilities} = this.state;

        return(
            <div className = "ui card">
                <div className="image">
                    <img src= {imageUrl} alt="pokemon"/>
                </div>
                <div className = "content">
                    <div className = "header">
                        <div><Link to = {{pathname:"/pokemon/data", state:{name}}}>{name}</Link></div>
                    </div>
                    <div className = "meta">
                        <div>National No.: {pokemonIndex}</div>
                        <div>Pokemon Type: {types}</div>
                    </div>
                    <div className="description">
                        <div>Height: {height}</div>
                        <div>Weight: {weight}</div>
                        <h3>Stats</h3>
                            <div>HP: {hp}</div>
                            <div>Attack: {attack}</div>
                            <div>Defense: {defense}</div>
                            <div>Sp. Atk: {specialAttack}</div>
                            <div>Sp. Def: {specialDefense}</div>
                            <div>Speed: {speed}</div>
                        <h3>Abilities</h3>
                            <div>Abilities: {abilities}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonList;