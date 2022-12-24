const pokemonList= document.getElementById('pokemonList');
const loadMoreButton= document.getElementById('more');
const limit=10
let offset=0
const pokedexWindowArea= document.querySelector('.pokedexWindowArea');
const maxRecords= 151


function loadPokemonItens(offset, limit) {
   
    pokeApi.getPokemons(offset, limit).then((pokemons=[])=>{
        //Mesma coisas as proximas duas linhas
        //const newList= pokemons.map((convertPokemonToLi))
        //const newList= pokemons.map((pokemon)=>convertPokemonToLi(pokemon))
        //const newHtml= newList.join('')
        //console.log(newList)
        //pokemonList.innerHTML+=newHtml;
        
    
        //O .map() faz exatamente a mesma coisa que esse trecho de codigo comentado
        // const listItem=[]
        //for(i=0; i<pokemons.length;i++) {
        //const pokemon=pokemons[i];
        //listItem.push(convertPokemonToLi(pokemon))
       // }
    
       //Já aqui junta todas as funções de manipulação e reescreve em uma unica linha kkkkkkkkkkkkkkk
       const newHtml=pokemons.map((pokemon)=>`
        <li class="pokemon ${pokemon.type}" onclick="configurarCard(${pokemon.number}, ${offset}, ${limit})" >
        <span class="number">#00${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        </li>
    `).join('')
       pokemonList.innerHTML+=newHtml;
       
    })
}

function openModal() {
    document.querySelector('.pokedexWindowArea').style.opacity= 0;
    document.querySelector('.pokedexWindowArea').style.display= 'flex';
    setTimeout(() => {
        document.querySelector('.pokedexWindowArea').style.opacity= 1;
    }, 200);
}

function configurarCard(order, offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons=[])=>{
        const newWindow= pokemons.map((pokemon)=> {
            if(pokemon.number===order) {   
                openModal()             
                return `
                <div class="pokedexWindowBody ${pokemon.type}">
                <div id="arrow_back" onclick="closeModal()">X</div>
                <div class="infosBasic">
                    <div class="windowNameAndType">
                        <div class="windowName">${pokemon.name}</div>
                        <ol class="windowTypes">
                            ${pokemon.types.map((type)=>`<li class="windowType ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="windowOrder">#00${pokemon.number}</div>
                </div>
                </div>
                
                <div class="windowInfoDetails">
                    <div class="about">
                        <div class="aboutTitle">About</div>
                        <div class="aboutBody">
                            <div class="aboutBody-Abilities">
                                <div class="aboutBody-Abilities-title">Abilities</div>
                                <div class="aboutBody-Abilities-body">${pokemon.ability1}, ${pokemon.ability2}</div>
                            </div>
                            <div class="aboutBody-experience">
                                <div class="aboutBody-experience-title">Experience</div>
                                <div class="aboutBody-experience-body">${pokemon.experiencia}</div>
                            </div>
                            <div class="aboutBody-cycle">
                                <div class="aboutBody-cycle-title">Eggs Cycle</div>
                                <div class="aboutBody-cycle-body">${pokemon.type}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="windowImage">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
        </div>
                `
                
            }
        }).join('')
        pokedexWindowArea.innerHTML=newWindow;
            
    })
}


loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', ()=>{
    offset+=limit
    const qtdRecordsNextPage=offset+limit
    if(qtdRecordsNextPage>=maxRecords) {
        const newLimit= maxRecords-offset
        loadPokemonItens(offset,newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset,limit)
    }
    
    
})
function closeModal() {
    document.querySelector('.pokedexWindowArea').style.opacity= 0;
    setTimeout(() => {
        document.querySelector('.pokedexWindowArea').style.display= 'none';
    }, 500);
}



