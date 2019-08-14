import React from 'react';
import Header from './header'
import PokeCard from './pokecard'

class Main extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Header></Header>
                <PokeCard></PokeCard>
            </div>
        )
    }
}

export default Main;