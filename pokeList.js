const fetchPokemon = () => {
    const urlAtual = window.location.href;
    const urlSplit = urlAtual.split("?");
    const id = urlSplit[1];
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemonPromise = [];

    pokemonPromise.push(fetch(pokemonUrl).then(response => response.json()));

    Promise.all(pokemonPromise)
        .then(pokemon => {
            console.log(pokemon);

            const pokemonHTML = pokemon.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name); 
                const abil = pokemon.abilities.map(typeAb => typeAb.ability.name);
                const nameStats = pokemon.stats.map(stats => stats.stat.name);
                const base_stat = pokemon.stats.map(stats => stats.base_stat);

                accumulator = `
                <li class="card ">
                        <h4>${pokemon.name.toUpperCase()}</h4>
                        <img class="card-img ${types[0]}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                    <div class="flex-container">
                        <div class="rotate">
                            <p><strong>#</strong> ${pokemon.id}</p>
                            <p>Tipos: ${types.join(' | ')}</p>
                            <p>Habilidades:${abil.join(' | ')}</p>
                            <p>Height: ${pokemon.height/10} m</p>
                            <p>weight: ${pokemon.weight/10} Kg</p>
                        </div>
                        <div class="stats">
                            <p>${nameStats[0]} - ${base_stat[0]}</p>
                            <p>${nameStats[1]} - ${base_stat[1]}</p>
                            <p>${nameStats[2]} - ${base_stat[2]}</p>
                            <p>${nameStats[3]} - ${base_stat[3]}</p>
                            <p>${nameStats[4]} - ${base_stat[4]}</p>
                            <p>${nameStats[5]} - ${base_stat[5]}</p>
                        </div>
                    </div>
                </li>`
                console.log(accumulator);

                return accumulator;
            }, '');

            const ul = document.getElementById('pokelist');
            ul.innerHTML = pokemonHTML;

            console.dir(pokemonHTML);
        })
}

fetchPokemon();



// console.log(urlSplit);