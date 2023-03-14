let buttom = document.getElementById("search-btn");
let image = document.getElementById("main-screen");
let imageShiny = document.getElementById("big-button");

let pokeName = document.getElementById("name-screen");
let pokeNumber = document.getElementById("id-screen");
let type = document.getElementById("type-screen");
let aboutScreen = document.getElementById("about-screen");

let form = document.querySelector(".form");

let search = document.getElementById("search");

const changePokemon = async () => {
  let randomNumber = Math.ceil(Math.random() * 649) + 1;

  let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

  let data = await fetch(requestString);

  let response = await data.json();

  //console.log(response);
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
    `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
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
    image.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    pokeName.innerHTML = data.name;
    pokeNumber.innerHTML = `# ${data.id}`;
    type.textContent = data.types[0].type.name;
    aboutScreen.innerHTML = `Height: ${data.height * 10}cm Weight: ${
      data.weight / 10
    }kg`;
    console.log(data);
  } else {
    pokeName.innerHTML = "Not found";
    pokeNumber.innerHTML = `Not found`;
    type.textContent = "Not found";
    aboutScreen.innerHTML = `Not found `;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  renderPokemon(search.value);
});

changePokemon();

buttom.addEventListener("click", changePokemon);
imageShiny.addEventListener("click", shiny);
