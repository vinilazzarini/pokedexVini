const mostrarPokemons = document.getElementById('container')
const voltar = document.getElementById('voltar')
const avancar = document.getElementById('avancar')
let pagina = 1

async function buscarPokemons(){
    const fim = pagina * 20
    const inicio = fim - 20
    const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${inicio}&limit=${fim}`
    const dados = await fetch(URL)
    return await dados.json()
}

async function buscarPokemon(nomePokemon){
    const URL = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`
    const dados = await fetch(URL)
    return await dados.json()
}


async function atualizarTemplate(){
    mostrarPokemons.innerHTML = ''
    const pokemons = (await buscarPokemons(pagina)).results
    
    pokemons.forEach(async pokemon => {
        let pkmn = await buscarPokemon(pokemon.name)

        const nome = (pkmn.name).toUpperCase()
        const foto = pkmn.sprites.front_default
        const tipo = pkmn.types[0].type.name

        mostrarPokemons.innerHTML += `
            <div class="exibir">
                <h2>${nome}</h2>
                <img src="${foto}" class="normal"/>
                <h3>tipo: ${tipo}</h3>
            </div>
        `       
    });
}

window.onload = async () => {
    atualizarTemplate()
}

avancar.addEventListener('click', () => {
    pagina += 1

    if(pagina > 50){
        pagina = 1
    }
    atualizarTemplate()
})

voltar.addEventListener('click', () => {
    pagina -= 1

    if(pagina < 1){
        pagina = 50
    }
    atualizarTemplate()
})