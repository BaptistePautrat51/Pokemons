import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../pokemon.service';
import {Pokemon} from '../models/pokemon.model';
import {PagedData} from '../models/paged-data.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }
  pokemons: PagedData<Pokemon>;


  ngOnInit(): void {
    this.getPokemons();
  }


  getPokemons(offset: number = 0, limit: number = 20): void {
    this.pokemonService.getPokemonsQuery(offset, limit).subscribe((pokemons: PagedData<Pokemon>) => this.pokemons = pokemons);
  }

  onScroll(): void {
    this.pokemons.offset += this.pokemons.limit;
    this.pokemonService.getPokemonsQuery(this.pokemons.offset, this.pokemons.limit)
      .subscribe((pokemons: PagedData<Pokemon>) => this.pokemons.data = this.pokemons.data.concat(pokemons.data) );
  }
}
