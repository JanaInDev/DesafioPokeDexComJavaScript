const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const searchInput = document.getElementById('search')
const toggleThemeButton = document.getElementById('toggleTheme')
const backToTop = document.getElementById('backToTop')

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        const cards = pokemonList.querySelectorAll('.pokemon')
        cards.forEach(card => card.style.opacity = '1')
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

if(searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase()
        const pokemons = document.querySelectorAll('.pokemon')

        pokemons.forEach(pokemon => {
            const name = pokemon.querySelector('.name').textContent.toLowerCase()
            pokemon.style.display = name.includes(query) ? 'flex' : 'none'
        })
    })
}

if(toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark')
        toggleThemeButton.textContent = document.body.classList.contains('dark') ? "☀️ Light Mode" : "🌙 Dark Mode"
    })

    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark')
        toggleThemeButton.textContent = "☀️ Light Mode"
    }
}

if(backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none'
    })

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}
