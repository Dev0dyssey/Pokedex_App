import React from 'react';

class PokemonList extends React.Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: ''
    }

    render(){
        const { name, url } = this.props

        return(
            <div className = "ui card">
                <div className = "content">
                    <div className = "header">
                        <div>{name}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonList;