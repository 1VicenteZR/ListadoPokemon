# 📦 Angular Pokédex App

Aplicación web desarrollada con **Angular 20**, que permite buscar Pokémon por nombre utilizando la [PokeAPI](https://pokeapi.co/), visualizarlos en una tarjeta, y gestionarlos en una tabla interactiva con opciones de editar y eliminar.

### 🌐 Demo

> ✅ Interfaz moderna con fondo personalizado y animaciones.  
> 🧠 Datos obtenidos en tiempo real desde una API pública.  
> 💾 Gestión de múltiples Pokémon en una tabla editable.

---

## 🚀 Tecnologías usadas

- [Angular 20](https://angular.io/)
- HTML, CSS moderno (con `backdrop-filter`)
- Consumo de APIs REST con `HttpClient`
- Bootstrap (solo en diseño base opcional)

---

## 📸 Capturas

<img width="800" alt="image1" src="https://github.com/user-attachments/assets/89806e30-7d72-462e-89dc-5966d5a8bddf" />
<img width="800" alt="image2" src="https://github.com/user-attachments/assets/4abbdfd6-01eb-45f3-8a0c-7212772332cb" />
<img width="2157" height="1258" alt="image" src="https://github.com/user-attachments/assets/cc21255e-cfe6-41b5-a0fd-4f37a0876c66" />
<img width="2156" height="1259" alt="image" src="https://github.com/user-attachments/assets/66615f7f-cb7f-4e03-9ae0-f205e468e743" />
<img width="2159" height="1257" alt="image" src="https://github.com/user-attachments/assets/c9d127ba-4b02-4c32-bc18-a6c285268d4a" />
<img width="2152" height="1250" alt="image" src="https://github.com/user-attachments/assets/d617b6e0-3023-431a-8f43-a23cb4dde59c" />
<img width="2159" height="1256" alt="image" src="https://github.com/user-attachments/assets/693b4ba2-f718-4726-8c61-7d81cbce21c9" />



---

## 🛠 Instalación

```bash
git clone https://github.com/tuusuario/angular-pokedex-app.git
cd angular-pokedex-app
npm install
ng serve
```

> Abre en tu navegador: [http://localhost:4200](http://localhost:4200)

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── pages/
│   │   ├── login/
│   │   ├── pokemon/
│   │   │   ├── pokemon.component.ts
│   │   │   ├── pokemon.component.html
│   │   │   ├── pokemon.component.css
│   ├── services/
│   │   └── pokemon.ts
├── assets/
│   └── fondo.jpg
```

---

## 🔍 Funcionalidades

### 🔎 Búsqueda de Pokémon

```ts
buscarPokemon() {
  this.pokemonService.getPokemonByName(this.pokemonName.toLowerCase())
    .subscribe(data => {
      this.pokemonData = data;
      this.pokemons.push(data);
      this.pokemonName = '';
    });
}
```

### 🧾 Edición in-place en formulario

```html
<div class="field-group">
  <label for="name">Nombre</label>
  <input id="name" [(ngModel)]="pokemonData.name" />
</div>
```

### 🧹 Eliminación instantánea

```ts
eliminar(index: number) {
  this.pokemons.splice(index, 1);
}
```

---

## 🎨 Estilo

Incluye efectos como:

```css
.thumbnail:hover {
  transform: scale(1.6);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
```

Fondo con blur:

```css
.pokemon-container {
  background: rgba(255, 255, 255, 0.30);
  backdrop-filter: blur(16px) saturate(160%);
}
```

---

## 📌 Notas

- Los datos no se guardan en un backend, solo existen mientras la app está abierta.
- Las imágenes de los Pokémon se muestran tanto en la tarjeta como en miniatura dentro de la tabla.

---

## 👤 Autor

**Vicente de Jesús Zenón Regalado**  
**Eric Aaron Juarez Fernandez**  
Estudiantes de Ingeniería en Sistemas Computacionales - Instituto Tecnológico de Oaxaca  
Equipo 9  
📧 [vicenteregalado11@hotmail.com](mailto:vicenteregalado11@hotmail.com)  
📸 [Instagram: @vicentevx7](https://instagram.com/vicentevx7)  
📧 [eric.aaron.jf@gmail.com](mailto:eric.aaron.jf@gmail.com)  
📸 [Instagram: @erico](https://instagram.com/_eric_juarezz)

---

## ⭐ Créditos

- [PokeAPI](https://pokeapi.co/) por los datos abiertos de Pokémon.
- [Usuarios](https://api.escuelajs.co/api/v1/users) por los datos de usuarios para el login
```

---
