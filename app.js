const buttom = document.getElementById("search-btn");
const image = document.getElementById("main-screen");
const imageShiny = document.getElementById("big-button");
const pokeName = document.getElementById("name-screen");
const pokeNumber = document.getElementById("id-screen");
const type = document.getElementById("type-screen");
const aboutScreen = document.getElementById("about-screen");
const form = document.querySelector(".form");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const search = document.getElementById("search");
let searchPokemon = 1;

const changePokemon = async () => {
  let randomNumber = Math.ceil(Math.random() * 649) + 1;
  let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
  let data = await fetch(requestString);
  let response = await data.json();
  image.src =
    response["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ];
  pokeName.innerHTML = response.name;
  pokeNumber.innerHTML = `# ${response.id}`;
  type.textContent = response.types[0].type.name;
  aboutScreen.innerHTML = `Height: ${response.height * 10}cm Weight: ${
    response.weight / 10
  }kg`;
};

const shiny = async () => {
  let randomNumber = Math.ceil(Math.random() * 150) + 1;
  let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
  let data = await fetch(requestString);
  let response = await data.json();
  image.src =
    response["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_shiny"
    ];
  pokeName.innerHTML = response.name;
  pokeNumber.innerHTML = `# ${response.id}`;
  type.textContent = response.types[0].type.name;
  aboutScreen.innerHTML = `Height: ${response.height * 10}cm Weight: ${
    response.weight / 10
  }kg`;
};

/**SEARCH BUTTOM */

const fetchPokemon = async (pokemon) => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIresponse.status === 200) {
    const data = await APIresponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokeName.innerHTML = "Loading... ";
  pokeNumber.innerHTML = "Loading... ";
  type.textContent = "Loading... ";
  aboutScreen.innerHTML = "Loading... ";
  const data = await fetchPokemon(pokemon);

  if (data) {
    searchPokemon = data.id;
    pokeName.innerHTML = data.name;
    image.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    pokeNumber.innerHTML = `# ${data.id}`;
    type.textContent = data.types[0].type.name;
    aboutScreen.innerHTML = `Height: ${data.height * 10}cm Weight: ${
      data.weight / 10
    }kg`;
    /* search.value = ""; */
    console.log(searchPokemon);
  } else {
    image.src = "img/oldman.png";

    pokeName.innerHTML = "Not found";
    pokeNumber.innerHTML = `Not found`;
    type.textContent = "Not found";
    aboutScreen.innerHTML = `Not found `;
  }
};

form.addEventListener("input", (e) => {
  console.log(e);
  e.preventDefault();
  renderPokemon(search.value.toLowerCase());
});

btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

changePokemon();

buttom.addEventListener("click", changePokemon);
imageShiny.addEventListener("click", shiny);
