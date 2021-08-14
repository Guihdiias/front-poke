import React, { Component } from "react";
import api from "../../services/api"
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {

    state = {
        pokemons: [],
        pokemonInfo: {},
        page: 1,
    }

    componentDidMount(){
        this.loadpokemons();
    }

    loadpokemons = async (page = 1) => {

        const response = await api.get(`/pokemon?page=${page}`);

        const { docs, ... pokemonInfo } = response.data;

        this.setState({ pokemons : docs, pokemonInfo, page });
        
    }

    prevPage = () => {
        const { page, pokemonInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadpokemons(pageNumber);
    }

    nextPage= () => {
        const { page, pokemonInfo } = this.state;

        if (page === pokemonInfo.pages) return;

        const pageNumber = page + 1;

        this.loadpokemons(pageNumber);
    }

    render(){
        const { pokemons, page, pokemonInfo } = this.state;
        
        return (
           <div className="pokemon-list">
               { pokemons.map(pokemon => (
                   <article key={ pokemon._id }>
                       <strong>{pokemon.title}</strong>
                       <p>{pokemon.title}</p>

                       <Link to={`/pokemon/${pokemon._id}`}>Acessar</Link>
                   </article>
               ))}
               <div className="actions">
                   <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                   <button disabled={page === pokemonInfo.pages} onClick={this.nextPage}>Próximo</button>
               </div>
           </div>
        )
    }
}