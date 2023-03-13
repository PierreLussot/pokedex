let buttom = document.getElementById("search-btn");
let image = document.getElementById("main-screen");
let imageShiny = document.getElementById("big-button");

let pokeName = document.getElementById("name-screen");
let pokeNumber = document.getElementById("id-screen");
let type = document.getElementById("type-screen");
let aboutScreen = document.getElementById("about-screen");

const changePokemon = async () => {
  let randomNumber = Math.ceil(Math.random() * 150) + 1;

  let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

  let data = await fetch(requestString);

  let response = await data.json();

  console.log(response);
  image.src = response.sprites.front_default;
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
  image.src = response.sprites.front_shiny;
  pokeName.innerHTML = response.name;
  pokeNumber.innerHTML = `# ${response.id}`;
  type.textContent = response.types[0].type.name;
  aboutScreen.innerHTML = `Height: ${response.height * 10}cm Weight: ${
    response.weight / 10
  }kg`;
};

changePokemon();

buttom.addEventListener("click", changePokemon);
imageShiny.addEventListener("click", shiny);
