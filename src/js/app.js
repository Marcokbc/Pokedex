const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(898).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    // console.log(pokemons);
    accumulator += `
                    <li id="${id}" class="card ${elementTypes[0]}">
                    <img id="${id}" class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
                        <h2 class="card-title">${id}. ${name}</h2>
                        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
                    </li>`
    return accumulator
}, '');

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = pokemons
}

window.onload = () => {
    var cLoader = document.getElementById("esconder");

    cLoader.style.display = 'none';
}

    const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML)
    .then(insertPokemonsIntoPage)

document.addEventListener("click", (e) =>{
    const target = e.target.className;
    const classSplit = target.split(" ");
    // console.log(classSplit);
    const id = e.target.id;

    if(classSplit[0] == "card" || classSplit[0] == "card-image"){
        window.location.href = `file:///C:/Users/User/Desktop/Marco/teste/Alura/Pokedex/public/pokemon/pokeList.html?${id}`;
    }
}); 
