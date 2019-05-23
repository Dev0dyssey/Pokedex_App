import React, { Component } from 'react';

import PokemonMain from '../Components/PokemonMain';

export default class Layout extends Component {
    render() {
        return (
            <div className = "row">
                <div className = "col">
                    <PokemonMain />
                </div>
            </div>
        )
    }
}
