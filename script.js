"use strict";

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

const appendTypes = function (types) {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};

const styleCard = function (color) {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
  card
    .querySelectorAll(".types span")
    .forEach((type) => (type.style.background = color));
};

const generateCard = function (data) {
  // Get necessary data and assign it to variables
  const pokeName = data.name;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const hp = data.stats[0].base_stat;
  const attack = data.stats[1].base_stat;
  const defense = data.stats[2].base_stat;
  const speed = data.stats[5].base_stat;

  //   Set themeColor based on pokemon type
  const themeColor = typeColor[data.types[0].type.name];

  card.innerHTML = `
    <p class="hp">
        <span>HP</span> ${hp}
    </p>
    <img src=${imgSrc} alt="Pokemon">
    <h2 class="poke-name">${pokeName[0].toUpperCase() + pokeName.slice(1)}</h2>
    <div class="types"></div>
    <div class="stats">
        <div>
            <h3>${attack}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${defense}</h3>
            <p>Defense</p>
        </div>
        <div>
            <h3>${speed}</h3>
            <p>Speed</p>
        </div>
    </div>
  `;

  appendTypes(data.types);
  styleCard(themeColor);
};

const getPokeData = function () {
  // Generate a random number between 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;

  //   Combine the pokeapi url with pokemon id
  const finalUrl = url + id;

  //   Fetch generated url
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => generateCard(data));
};

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
