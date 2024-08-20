const input = document.getElementById("search-input");
const inputBtn = document.getElementById("search-button");

// all Pokemon attributes
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const img = document.getElementById("sprite");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

async function fetchPokemonAttributes(str) {
    const result = str.replace(/ /g, '-');

    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${result.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const pokemon = await response.json();
        // make container visible and image display
        document.querySelector('.pokemon-info').style.visibility = 'visible';
        img.style.display = 'block';

        // set pokemon info
        pokemonName.textContent = pokemon.name.toUpperCase();
        pokemonId.textContent = `#${pokemon.id}`;
        weight.textContent = pokemon.weight;
        height.textContent = pokemon.height;
        img.src = pokemon.sprites.front_default;

        // set stats
        hp.textContent = pokemon.stats[0].base_stat;
        attack.textContent = pokemon.stats[1].base_stat;
        defense.textContent = pokemon.stats[2].base_stat;
        spAttack.textContent = pokemon.stats[3].base_stat;
        spDefense.textContent = pokemon.stats[4].base_stat;
        speed.textContent = pokemon.stats[5].base_stat;

        // set types
        types.innerHTML = pokemon.types.map(obj => `<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`).join(' ');
        
    } catch (error) {
        resetEverything();
        console.error('There was a problem with the fetch operation:', error);
        alert("Pokémon not found");
    }
}

function resetEverything() {
    // hide container and image
    document.querySelector('.pokemon-info').style.visibility = 'hidden';
    img.style.display = 'none';

    // reset stats
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    types.innerHTML = '';
    height.textContent = '';
    weight.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    spAttack.textContent = '';
    spDefense.textContent = '';
    speed.textContent = '';
}

inputBtn.addEventListener("click", () => {
    fetchPokemonAttributes(input.value);
});