// Imagens
const pegaImagemNoGit = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
const pegaImagemNoGitShiny = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/"
const pegaTipoNoGit = "../img/tipos/"

// Dia da semana
const dia = new Date();
const diaIndex = dia.getDay();
const weekDayArr = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
const getWeekDay = (dayIndexParam) => weekDayArr[dayIndexParam];
let diaAtual = getWeekDay(diaIndex);

// Chama Api
function buscaNaApi(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

// Api Moeda
function APIMoeda() {
  dataMoeda = buscaNaApi(
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL"
  );
  moeda = JSON.parse(dataMoeda);
}

// Euro
function atualizarDados() {
  APIMoeda();
  let euro = moeda.EURBRL.bid;

  let euroMoeda = parseFloat(euro).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  // Transforma em número inteiro
  let tiraSimbolos = Number(euroMoeda.replace(/[^0-9\.-]+/g, ""));
  numeroInteiro = tiraSimbolos.toString();

  // Pokedex
  function ApiPokemon() {
    dataPokemon = buscaNaApi(
      `https://pokeapi.co/api/v2/pokemon/${numeroInteiro}`
    );
    pokemon = JSON.parse(dataPokemon);
  }
  ApiPokemon();

  // Corrigir nome do Pokémon
  let pokemonNome = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  let removePalavra = [
    "-incarnate",
    "-male",
    "-single-strike",
    "-full-belly",
    "-ice",
    "-amped",
    "-disguised",
    "-red-meteor",
    "-solo",
    "-midday",
    "-baile",
    "-50",
    "-average",
    "-shield",
    "-ordinary",
    "-aria",
    "-standard",
    "-red-striped",
    "-land",
    "-altered",
    "-plant",
    "-normal",
  ];

  removePalavra.forEach((word) => {
    if (pokemonNome.includes(word)) {
      pokemonNome = pokemonNome.replace(new RegExp(word, "g"), "");
    }
  });

  // pokemonTipo = pokemon.types
  const pokemonTipoTamanho = pokemon.types.length.toString();
  if (pokemonTipoTamanho == 1) {
    var tipo1 = pokemon.types[0].type.name;
  } else {
    var tipo1 = pokemon.types[0].type.name;
    var tipo2 = pokemon.types[1].type.name;
  }
  // Altura e peso
  let altura = pokemon.height / 10;
  let peso = pokemon.weight / 10;

  // Habilidades comprimento
  let habilidadesTamanho = pokemon.abilities.length;
  //Verifica quantas habilitas o pokémon possui
  if (habilidadesTamanho == 3) {
    var habilidade1 =
      pokemon.abilities[0].ability.name.charAt(0).toUpperCase() +
      pokemon.abilities[0].ability.name.slice(1);
    var habilidade2 =
      pokemon.abilities[1].ability.name.charAt(0).toUpperCase() +
      pokemon.abilities[1].ability.name.slice(1);
    var habilidade3 =
      pokemon.abilities[2].ability.name.charAt(0).toUpperCase() +
      pokemon.abilities[2].ability.name.slice(1);
  } else if (habilidadesTamanho == 2) {
    var habilidade1 =
      pokemon.abilities[0].ability.name.charAt(0).toUpperCase() +
      pokemon.abilities[0].ability.name.slice(1);
    var habilidade2 =
      pokemon.abilities[1].ability.name.charAt(0).toUpperCase() +
      pokemon.abilities[1].ability.name.slice(1);
  } else {
    var habilidade1 =
      pokemon.abilities[0].ability.name.charAt(0).toUpperCase() +
      pokemon.abilities[0].ability.name.slice(1);
  }

  let hpBase = pokemon.stats[0].base_stat;
  let atkBase = pokemon.stats[1].base_stat;
  let defBase = pokemon.stats[2].base_stat;
  let spAtkBase = pokemon.stats[3].base_stat;
  let spDefBase = pokemon.stats[4].base_stat;
  let spdBase = pokemon.stats[5].base_stat;
  let totalBase = hpBase + atkBase + defBase + spAtkBase + spDefBase + spdBase;

  // Barra de status
  let hp = Math.round((hpBase * 100) / 250);
  let atk = Math.round((atkBase * 100) / 250);
  let def = Math.round((defBase * 100) / 250);
  let spAtk = Math.round((spAtkBase * 100) / 250);
  let spDef = Math.round((spDefBase * 100) / 250);
  let spd = Math.round((spdBase * 100) / 250);
  let total = Math.round((totalBase * 100) / 1500);

  // Front
  // Escreve valor atual
  document.querySelector(
    ".valor_euro"
  ).innerHTML = `€1 está valendo  ${euroMoeda}`;

  // Altera nome no site
  document.querySelector(".pokemon_nome").innerHTML = `${pokemonNome}`;

  // No.
  document.querySelector(".pokemon_valor").innerHTML = `No.${numeroInteiro}`;

  // Altera imagem do Pokémon
  document.querySelector(".pokemon_nome").innerHTML = `${pokemonNome}`;
  if (diaAtual == "Domingo" || diaAtual == "Sábado") {
    document.getElementById(
      "pokemon_img"
    ).src = `${pegaImagemNoGitShiny}${numeroInteiro}.png`;
  } else {
    document.getElementById(
      "pokemon_img"
    ).src = `${pegaImagemNoGit}${numeroInteiro}.png`;
  }

  document.querySelector(".medidas").innerHTML = `
  <h6 class="altura">${altura}m</h6>
  <p class="divisa">|</p>
  <h6 class="peso">${peso}kg</h6>
  `;

  // Tipo
  if (pokemonTipoTamanho == 1) {
    document.querySelector(
      ".tipo"
    ).innerHTML = `<img src="${pegaTipoNoGit}${tipo1}.svg" alt="Pokémon do tipo ${tipo1}" class="pokemon_tipo tipo-${tipo1}">`;
  } else {
    document.querySelector(
      ".tipo"
    ).innerHTML = `<img src="${pegaTipoNoGit}${tipo1}.svg" alt="Pokémon do tipo ${tipo1}" class="pokemon_tipo tipo-${tipo1}">
    <img src="${pegaTipoNoGit}${tipo2}.svg" alt="Pokémon do tipo ${tipo2}" class="pokemon_tipo tipo-${tipo2}">`;
    document.querySelector(".tipo_texto").innerHTML = `Tipos`;
  }

  // Habilidade ou habilidadeS
  if (habilidadesTamanho == 2) {
    document.querySelector(".habilidade_texto").innerHTML = `Habilidades`;
  }

  // Cria habilidades
  if (habilidadesTamanho == 1) {
    document.querySelector(".habilidades_global").innerHTML = `
    <div class="habilidades_naturais">
    <h4 class="habilidade1">${habilidade1}</h4>
    </div>
    `;
  } else if (habilidadesTamanho == 2) {
    document.querySelector(".habilidades_global").innerHTML = `
    <div class="habilidades_naturais">
    <h4 class="habilidade1">${habilidade1}</h4>
    </div>
    <div class="habilidade_oculta">
    <h4 class="habilidade2">${habilidade2}</h4>
    <h5 class="oculta">(habilidade oculta)</h5>
  </div>
    `;
  } else if (habilidadesTamanho == 3) {
    document.querySelector(".habilidades_global").innerHTML = `
    <div class="habilidades_naturais">
    <!-- Nomes das habilidades -->
    <h4 class="habilidade1">${habilidade1}</h4>
    <h4 class="habilidade2">${habilidade2}</h4>
    </div>
    <div class="habilidade_oculta">
    <h4 class="habilidade3">${habilidade3}</h4>
    <h5 class="oculta">(habilidade oculta)</h5>
    </div>
    `;
  }

  // Valor dos status
  document.querySelector(".stats_valor_hp").innerHTML = `${hpBase}`;
  document.querySelector(".stats_valor_atk").innerHTML = `${atkBase}`;
  document.querySelector(".stats_valor_def").innerHTML = `${defBase}`;
  document.querySelector(".stats_valor_spatk").innerHTML = `${spAtkBase}`;
  document.querySelector(".stats_valor_spdef").innerHTML = `${spDefBase}`;
  document.querySelector(".stats_valor_spd").innerHTML = `${spdBase}`;
  document.querySelector(".stats_valor_total").innerHTML = `${totalBase}`;

  // // Barras de status
  document.querySelector(".stats_hp").style.width = `${hp}%`;
  document.querySelector(".stats_atk").style.width = `${atk}%`;
  document.querySelector(".stats_def").style.width = `${def}%`;
  document.querySelector(".stats_spatk").style.width = `${spAtk}%`;
  document.querySelector(".stats_spdef").style.width = `${spDef}%`;
  document.querySelector(".stats_spd").style.width = `${spd}%`;
  document.querySelector(".stats_total").style.width = `${total}%`;
}

// Atualizar a cada 60 segundos (5 segundos)
setInterval(atualizarDados, 5000);

// Chamada inicial para carregar os dados logo ao abrir a página
atualizarDados();
