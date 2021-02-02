import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {Pokemon} from './models/pokemon.model';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {PagedData} from './models/paged-data.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) { }

  private pokemonUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons';

  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.httpClient.get<PagedData<Pokemon>>(this.pokemonUrl).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemon'))
    );
  }

  getPokemonsQuery(offset: number, limit: number): Observable<PagedData<Pokemon>> {
    return this.httpClient.get<PagedData<Pokemon>>(this.pokemonUrl + '?offset=' + offset + '&limit=' + limit).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemon'))
    );
  }

// tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url = this.pokemonUrl + '/' + id;
    // TODO: send the message _after_ fetching the hero
    return this.httpClient.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getHero id=${id}`))
    );



    }
}

