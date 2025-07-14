import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from '../../services/pokemon';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './pokemon.html',
  styleUrls: ['./pokemon.css'],
  providers: [PokemonService]
})
export class PokemonComponent implements OnInit {
  pokemonName: string = '';
  pokemonData: any = null;
  pokemons: any[] = [];
  errorMessage: string = '';
  isEditing: boolean = false;
  editIndex: number = -1;

  todosLosPokemones: any[] = [];
  todosLosPokemonesPaginados: any[] = [];
  paginaAPI: number = 0;
  totalPaginasAPI: number = 0;
  paginasVisibles: number[] = [];

  pokemonSeleccionado: any = null;
  modalActivo: boolean = false;

  pokemonNombreOriginal: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.obtenerPokemonesDesdeAPI();
  }

  buscarPokemon(): void {
    this.errorMessage = '';
    if (!this.pokemonName.trim()) return;

    this.pokemonService.getPokemon(this.pokemonName.trim().toLowerCase()).subscribe({
      next: (data) => {
        this.pokemonData = this.transformarPokemon(data);
        this.pokemons.push(this.pokemonData);
        this.pokemonName = '';
      },
      error: () => {
        this.errorMessage = 'Pokémon no encontrado.';
        this.pokemonData = null;
      }
    });
  }

  obtenerPokemonesDesdeAPI(): void {
    this.pokemonService.getPokemonList(this.paginaAPI).subscribe(async res => {
      const detalles = await Promise.all(res.results.map((p: any) =>
        this.pokemonService.getPokemon(p.name).toPromise()
      ));
      this.todosLosPokemones = detalles.map(this.transformarPokemon);
      this.totalPaginasAPI = Math.ceil(res.count / 20);
      this.todosLosPokemonesPaginados = [...this.todosLosPokemones];
      this.actualizarPaginasVisibles();
    });
  }

  transformarPokemon(data: any): any {
    return {
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map((t: any) => t.type.name).join(', '),
      experience: data.base_experience,
      height: data.height,
      weight: data.weight
    };
  }

  paginaAnteriorAPI(): void {
    if (this.paginaAPI > 0) {
      this.paginaAPI--;
      this.obtenerPokemonesDesdeAPI();
    }
  }

  paginaSiguienteAPI(): void {
    if (this.paginaAPI + 1 < this.totalPaginasAPI) {
      this.paginaAPI++;
      this.obtenerPokemonesDesdeAPI();
    }
  }

  irAPagina(pagina: number): void {
    this.paginaAPI = pagina;
    this.obtenerPokemonesDesdeAPI();
  }

  actualizarPaginasVisibles(): void {
    const total = this.totalPaginasAPI;
    const actual = this.paginaAPI;
    const maxPaginas = 5;

    let inicio = Math.max(0, actual - Math.floor(maxPaginas / 2));
    let fin = inicio + maxPaginas;

    if (fin > total) {
      fin = total;
      inicio = Math.max(0, fin - maxPaginas);
    }

    this.paginasVisibles = Array.from({ length: fin - inicio }, (_, i) => i + inicio);
  }

  verDetalles(pokemon: any): void {
    this.pokemonSeleccionado = { ...pokemon };
    this.modalActivo = true;
  }

  cerrarModal(): void {
    this.modalActivo = false;
    this.pokemonSeleccionado = null;
  }

  editarPokemonDesdeModal(): void {
    this.pokemonNombreOriginal = this.pokemonSeleccionado.name;
    this.pokemonData = { ...this.pokemonSeleccionado };
    this.isEditing = true;
    this.cerrarModal();
  }

  editarDesdeTabla(pokemon: any): void {
    this.pokemonNombreOriginal = pokemon.name;
    this.pokemonData = { ...pokemon };
    this.isEditing = true;
  }

  confirmarEliminacion(pokemon: any): void {
    if (confirm(`¿Estás seguro de eliminar a ${pokemon.name}?`)) {
      this.todosLosPokemones = this.todosLosPokemones.filter(p => p.name !== pokemon.name);
      this.todosLosPokemonesPaginados = [...this.todosLosPokemones];
      this.actualizarPaginasVisibles();
      this.cerrarModal();
    }
  }

  guardarEdicion(): void {
    if (this.pokemonData) {
      if (confirm(`¿Deseas guardar los cambios para ${this.pokemonData.name}?`)) {
        const index = this.todosLosPokemones.findIndex(p => p.name === this.pokemonNombreOriginal);
        if (index !== -1) {
          this.todosLosPokemones[index] = { ...this.pokemonData };
          this.todosLosPokemonesPaginados = [...this.todosLosPokemones];
        }
        this.cancelarEdicion();
      }
    }
  }

  cancelarEdicion(): void {
    this.isEditing = false;
    this.editIndex = -1;
    this.pokemonData = null;
    this.pokemonNombreOriginal = '';
  }
}
