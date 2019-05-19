import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import PokemonMain from './PokemonMain';
import PokemonData from './PokemonData';


import '../CSS/pokemon.css';

class App extends React.Component {
    render() {
        return(
            <>
                <BrowserRouter>
                    <Route path = '/' exact component = {PokemonMain} />
                    <Route path = '/pokemon/data' exact component = {PokemonData} />
                </BrowserRouter>
            </>
        );
    }

}

export default App;