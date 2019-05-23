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
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')
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
            <>
            <div className = "col-lg-3 col-sm-6 mb-5">
                <div className = "card">
                <div className="card-img-top">
                    <img src= {imageUrl} alt="pokemon"/>
                </div>
                <div className = "card-body">
                    <h3 className = "card-title">
                        <div><Link to = {{pathname:"/pokemon/data", state: this.state}}>{name}</Link></div>
                    </h3>
                    <div className = "card-text">
                        <div>National No.: {pokemonIndex}</div>
                        <div>Pokemon Type: {types}</div>
                    </div>
                    <div className="card-text">
                        <div>Height: {height}</div>
                        <div>Weight: {weight}</div>
                    </div>
                        <br/>
                    <div className = "card-text">
                        <h5>Stats</h5>
                            <div className="progress">
                                <div className="progress-bar bg-danger" role = "progressbar" style = {{width: `${hp}%`}} aria-valuenow = {hp} aria-valuemin="0" aria-valuemax="100">HP: {hp}</div>
                            </div>
                            <br/>
                            <div className="progress">
                                <div className="progress-bar bg-warning" role = "progressbar" style = {{width: `${attack}%`}} aria-valuenow = {attack} aria-valuemin="0" aria-valuemax="100">Att: {attack}</div>
                            </div>
                            
                            <br/>
                            <div className="progress">
                                <div className="progress-bar bg-info" role = "progressbar" style = {{width: `${defense}%`}} aria-valuenow = {defense} aria-valuemin="0" aria-valuemax="100">Def: {defense}</div>
                            </div>
                            
                            <br />
                            <div className="progress">
                                <div className="progress-bar" role = "progressbar" style = {{width: `${specialAttack}%`}} aria-valuenow = {specialAttack} aria-valuemin="0" aria-valuemax="100">Sp. Atk: {specialAttack}</div>
                            </div>
                            
                            <br />
                            <div className="progress">
                                <div className="progress-bar" role = "progressbar" style = {{width: `${specialDefense}%`}} aria-valuenow = {specialDefense} aria-valuemin="0" aria-valuemax="100">Sp. Def: {specialDefense}</div>
                            </div>
                            
                            <br />
                            <div className="progress">
                                <div className="progress-bar bg-success" role = "progressbar" style = {{width: `${speed}%`}} aria-valuenow = {speed} aria-valuemin="0" aria-valuemax="100">Speed: {speed}</div>
                            </div>
                            
                        <br />
                        <h5>Abilities</h5>
                            <div>Abilities: {abilities}</div>
                    </div>
                </div>
                </div>
            </div>
            </>
        );
    }
}

export default PokemonList;