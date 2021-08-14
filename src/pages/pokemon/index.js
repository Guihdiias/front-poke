import React, { Component } from 'react';
import api from "../../services/api"

import './styles.css';

export default class Pokemon extends Component {
    state = {
        pokemon: {},
    };

    async componentDidMount(){
        const { pokemonName } = this.props.match.params;

        const response = await api.get(`/pokemon/${pokemonName}`);

        this.setState({ pokemon: response.data });
    }

    render() {
        const { pokemon } = this.state;
  
        let listOfTypes = [] 
        let listOfEvolutions = [] 
        let listOfEvolutionsTypes = [] 

        if(typeof pokemon.types !== 'undefined')
            listOfTypes= pokemon.types.map((item) => 
                <label className={ item.type.name }>{item.type.name}</label>
            )


        if(typeof pokemon.evolutionChain !== 'undefined')
            listOfEvolutions = pokemon.evolutionChain.map((item) => 
                <div className="pokemon-evolution-display">
                    <div className="pokemon-evolution-item">
                        <img src={item.imgPath}/>
                        <p>{item.name + " #" + item.id}</p>
                        <div className="pokemon-type pokemon-type-evolution">
                            { item.types.map((type) => <label className={ type.type.name }>{type.type.name}</label> ) }
                        </div>
                    </div>
                </div>
            )

            //listOfEvolutionsTypes = item.types.map((teste) => teste.map((type) => <label className={ type.name }>{type.name}</label>))
        return (

            <section className="pokemon">
                <div className="pokemon-name">
                    <h1> { pokemon.name } </h1>
                </div>
                <div className="pokemon-content">
                    
                    <img src={pokemon.imgPath}/>
                    <div className="pokemon-info">
                        
                        <p>Type</p>
                        <div className="pokemon-type">
                            { listOfTypes }
                        </div>
                    </div>
                   
                </div>
                <div className="pokemon-evolution">
                    <p>Evolutions</p>
                    { listOfEvolutions }
                </div>
            </section>
        )
    }
}