const formulario = document.forms.namedItem('entrada')
const exibir = document.getElementById('exibir')

const voltar = document.getElementById('voltar')
const avancar = document.getElementById('avancar')

let fotos = {}
let contador = 1

window.onload = async () => {
    try{
        const pokemon = await encontrarPokemon(contador)
        
        mostrarPokemon(pokemon)
        
        formulario.pokemon.value = ''

    }catch(erro){
        alert('Pokemon não encontrado')
    }    
}

function encontrarPokemon(nomePokemon){
    const URL = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`
    return fetch(URL)
        .then(dados => dados.json())
        
}

async function mostrarPokemon(pokemon){
    const nome = (pokemon.name).toUpperCase()
    
    const id = pokemon.id
    
    const fotoPadrao = pokemon.sprites.front_default
    const fotoShiny = pokemon.sprites.front_shiny
    var audio = new Audio(pokemon.cries.latest);
    fotos = {
        normal: fotoPadrao,
        shiny: fotoShiny
    }
    const tipo = pokemon.types[0].type.name

    audio.play()
    exibir.innerHTML = `
        <h2>${nome}</h2>
        <img src="${fotos.normal}" class="normal"/>
        <h3>tipo: ${tipo}</h3>
        <button id="trocar" onclick="trocarEstilo()">Ver shiny</button>
    `
    
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nomePokemon = formulario.pokemon.value
    

    try{
        const pokemon = await encontrarPokemon(nomePokemon.toLowerCase())
        contador = pokemon.id
        mostrarPokemon(pokemon)
        
        formulario.pokemon.value = ''

    }catch(erro){
        alert('Pokemon não encontrado')
    }

})

avancar.addEventListener('click', async () => {
    contador += 1
    if(contador > 1025){
        contador = 1

    }
    try{
        const pokemon = await encontrarPokemon(contador)
        mostrarPokemon(pokemon)

    }catch(erro){
        alert('Pokemon não encontrado')
        contador -= 1
        mostrarPokemon(pokemon)
    }
    
})

voltar.addEventListener('click', async () => {
    contador -= 1
    if(contador < 1){
        contador = 1025
        
    }
    try{
        const pokemon = await encontrarPokemon(contador)
        mostrarPokemon(pokemon)

    }catch(erro){
        alert('Pokemon não encontrado')
        contador -= 1
        mostrarPokemon(pokemon)
    }
    
})

window.trocarEstilo = () => {
    const imagem = document.querySelector('img')
    const botaoTroca = document.getElementById('trocar')

    if(imagem.className === 'normal'){
        imagem.className = 'shiny'
        imagem.src = fotos.shiny
        botaoTroca.innerText = 'Ver normal'
    }else{
        imagem.className = 'normal'
        imagem.src = fotos.normal
        botaoTroca.innerText = 'Ver shiny'
    }
}
