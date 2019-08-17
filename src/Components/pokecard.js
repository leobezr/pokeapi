import React from 'react'
import { Row, Col } from 'reactstrap';

import Pokedex from 'pokedex-promise-v2'
const pokemon = new Pokedex()
const list = [];

class PokeCard extends React.Component {
    constructor() {
        super();
        this.state = {

            accepts: false,
            proceed: false,
            pokemon: {
                id: '',
                name: '',
                skills: '',
                exp: '',
                moves: '',
                weight: '',
                forms: ''
            },
            pokelist: [],
            treatments: {
                error: false,
                response: ''
            }

        }
    }

    search = () => {
        const query = this.state.pokename.toLowerCase();
        pokemon.getPokemonByName(query)
            .then(response => {
                if (response) {
                    this.setState({
                        treatments: {
                            error: false,
                            response: 'Pokemon encontrado.'
                        },
                        pokemon: {
                            id: response.order,
                            name: response.name,
                            exp: response.base_experience,
                            skills: response.abilities,
                            moves: response.moves,
                            weight: response.weight,
                            forms: response.sprites['front_default']
                        }
                    })
                    if ( !list.some( e => e.name === this.state.pokemon.name ) ){
                        list.push(this.state.pokemon)
                    }
                    
                    this.setState({
                        pokelist: list
                    })
                    console.log(this.state.pokelist)
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    treatments: {
                        error: true,
                        response: 'Não foram encontrados pokemons.'
                    }
                })
            })
    }

    handlePokeName = event => {
        const pokemonName = event.target.value
        this.setState({
            pokename: pokemonName
        })
    }

    gotit = () => {
        this.setState({
            accepts: true
        })

        setTimeout(() => {
            this.setState({
                proceed: true
            })
        }, 1000)
    }

    childHandler = props => {
        this.setState({
            pokename: props
        })
        setTimeout(() => {
            this.search()
        }, 100)
    }

    render() {
        const { treatments, pokemon, pokelist } = this.state;

        return (
            <div className="container full-h">
                <Row className={`h-inherit ${!this.state.accepts ? 'd-block' : 'fadedown'} ${this.state.proceed ? 'd-none' : false}`}>
                    <Col xl={12} className="h-inherit">
                        <div className="wrap h-inherit d-flex justify-content-center align-items-center flex-column" id="card">
                            <h1 className="text-center d-block mb-4">Pokemon <strong>API</strong></h1>
                            <p className="d-block mb-2">Esse app tem como objetivo mostrar um pouco dos meus conhecimentos em <strong>ReactJS</strong></p>
                            <p className="d-block mb-2">Foi um desafio proposto por uma empresa para ver como eu me sairia.</p>
                            <p className="d-block mb-5">Caso tenha interesse, dê uma olhada no meu GitHub, <strong><a href="#" target="_blank" rel="nofollow">Clique aqui</a></strong>.</p>
                            <p><button className="btn btn-primary" onClick={this.gotit}>Entendi</button></p>
                        </div>
                    </Col>
                </Row>

                <Row className={`h-inherit query ${this.state.proceed ? 'fadeup' : 'd-none'}`}>
                    <Col xl={12} className="h-inherit">
                        <div className="wrap h-inherit d-flex justify-content-center align-items-center flex-column" id="card">
                            <h1 className="text-center">Qual seu <strong>pokemon</strong>?</h1>
                            <input type="text" placeholder="Digite aqui..." className="w-100 d-block" onChange={this.handlePokeName}></input>
                            <button className="btn btn-primary" onClick={this.search}>Pesquisar</button>
                            <Label treatments={treatments} pokemon={pokemon} pokelist={pokelist} childHandler={this.childHandler}></Label>
                        </div>
                    </Col>
                </Row>


            </div>
        )
    }
}

class Label extends React.Component {
    render() {
        const { treatments, pokemon, pokelist, childHandler } = this.props;
        const response = { treatments, pokemon, pokelist, childHandler }
        if (response.treatments.error) {
            return (
                <div>
                    <label className="mt-3">{response.treatments.response}</label>
                </div>
            )
        } else {
            return (
                <div className="w-100">
                    <PokeItem pokemon={response.pokemon}></PokeItem>
                    <PokeList pokelist={response.pokelist} childHandler={response.childHandler}></PokeList>
                </div>
            )
        }
    }
}

class PokeList extends React.Component {
    render(){
        const { pokelist, childHandler } = this.props

        if ( Array.isArray(pokelist) && pokelist.length > 0 ){
            return(
                <div>
                    <ul className="historico">
                    {pokelist.map((item, i) => {
                        const name = item.name
                        return(
                            <li key={i}>
                                <figure className="thumb" name={item.name} onClick={() => {
                                    console.log(name)
                                    childHandler(name)
                                } }>
                                    <img src={item.forms} />
                                </figure>
                            </li>
                        )
                    })}
                    </ul>
                </div>
            )
        } return <div className="d-none"></div>
    }
}

//!-- PokeItem 
// * Serve pra puxar a query com mais informações
class PokeItem extends React.Component {

    _print = []
    moves = items => {
        this._print = []
        for (let i in items.moves) {
            this._print.push(items.moves[i])
        }
    }
    skill = items => {
        this._print = []
            for (let i in items.skills) {
                this._print.push(items.skills[i])
        }
    }

    render() {
        const { pokemon } = this.props

        return (
            <div className={pokemon.name.length > 0 ? 'd-block' : 'd-none'}>
                <div className="pokecard">
                    <div className="split">
                        <figure>
                            <img src={pokemon.forms} />
                        </figure>
                    </div>
                    <div className="split">
                        <h3 className="mt-2">{pokemon.name}</h3>
                        <p className="m-0 d-block"><strong>Peso:</strong> {pokemon.weight}</p>
                        <p className="mb-3 d-block"><strong>Experiência:</strong> {pokemon.exp}</p>
                        {/* 
                            Skills
                        */}
                        {this.skill(pokemon)}
                        <h4>Habilidades</h4>
                        <ul>
                            {this._print.map((item, i) => {
                                return (
                                    <li key={i}>{item.ability.name}</li>
                                )
                            })}
                        </ul>
                        {/* 
                            Moves
                        */}
                        {this.moves(pokemon)}
                        <h4>Ataques</h4>
                        <ul>
                            {this._print.map((item, i) => {
                                if ( i < 5 ){
                                    return (
                                        <li key={i}>{item.move.name}</li>
                                    )
                                } return
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default PokeCard;