const pokemonName = document.querySelector('input[name="pokename"]')
const displayDex = document.querySelector('.dexdisplay')
const pokeSprites = document.querySelector('.pokesprites')
const p = {
    name: document.querySelector('.pokename'),
    type: document.querySelector('.poketype')
}
const img = {
    front: document.querySelector('.pokesprites>.front'),
    back: document.querySelector('.pokesprites>.back')
}
const shiny = document.querySelector('input[name="pokeShiny"]')
const female = document.querySelector('input[name="pokeSex"]')


pokemonName.oninput = pokeReq
shiny.oninput = pokeReq
female.oninput = pokeReq

async function pokeReq() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value}`)
        if (response.status == 404) {
            return
        }
        const data = await response.json()
        console.log(data)
        loaderPoke(data)
    } catch (e) {
        console.error(e)
    }
}

function loaderPoke(res) {
    const typesArr = []

    if (shiny.checked == true && female.checked == true) {
        if (res.sprites.back_shiny_female == null) {
            img.front.src = res.sprites.front_shiny
            img.back.src = res.sprites.back_shiny
        } else {
            img.front.src = res.sprites.front_shiny_female
            img.back.src = res.sprites.back_shiny_female
        }
    } else if (female.checked == true && shiny.checked == false) {
        if (res.sprites.front_female == null) {
            img.front.src = res.sprites.front_default
            img.back.src = res.sprites.back_default
        } else {
            img.front.src = res.sprites.front_female
            img.back.src = res.sprites.back_female
        }
    } else if (shiny.checked == true && female.checked == false) {
        if (res.sprites.front_shiny == null) {
            img.front.src = res.sprites.front_default
            img.back.src = res.sprites.back_default
        } else {
            img.front.src = res.sprites.front_shiny
            img.back.src = res.sprites.back_shiny
        }
    } else {
        img.front.src = res.sprites.front_default
        img.back.src = res.sprites.back_default
    }

    p.name.innerText = 'name: ' + res.name

    for (let i = 0; i < res.types.length; i++) {
        typesArr.push(res.types[i].type.name)
    }
    if (typesArr.length < 1) {
        p.type.innerText = 'type: ' + typesArr.join(', ')
    } else {
        p.type.innerText = 'types: ' + typesArr.join(', ')
    }
}