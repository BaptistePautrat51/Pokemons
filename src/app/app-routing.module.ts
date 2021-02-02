import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonDetailComponent} from './pokemons/pokemon-detail/pokemon-detail.component';
import {PokemonListComponent} from './pokemons/pokemon-list/pokemon-list.component';


const routes: Routes = [
  {
    path: 'detail/:id', component: PokemonDetailComponent
  },
  {
    path: '', redirectTo: '/pokemons', pathMatch: 'full'
  },
  {
    path: 'pokemons', component: PokemonListComponent
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

