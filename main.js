const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();

async function start() {
  const weatherPromise = await fetch(
    "https://api.weather.gov/gridpoints/VEF/117,92/forecast"
  );
  const weatherData = await weatherPromise.json();

  const ourTemp = weatherData.properties.periods[0].temperature;

  document.querySelector("#temp-output").textContent = ourTemp;
}

start();

async function petsArea() {
  const petsPromise = await fetch(
    "https://learnwebcode.github.io/bootcamp-pet-data/pets.json"
  );
  const petsData = await petsPromise.json();
  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".pet-card").dataset.species = pet.species;

    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".pet-age").textContent = petAge(pet.birthYear);
    clone.querySelector(".pet-description").textContent = pet.description;

    if (!pet.photo) pet.photo = "images/fallback.jpg";

    clone.querySelector(".pet-card-photo img").src = pet.photo;
    wrapper.appendChild(clone);
  });
  document.querySelector(".list-of-pets").appendChild(wrapper);
}

petsArea();

function petAge(age) {
  const currentYear = new Date().getFullYear();
  const ages = currentYear - age;

  if (ages == 1) return "1 year old";
  if (ages == 0) return "Less than a year old";

  return `${ages} years old`;
}

// pet filter code

const allButtons = document.querySelectorAll(".pet-filter button");

allButtons.forEach((el) => {
  el.addEventListener("click", handleButtonClick);
});

function handleButtonClick(e) {
  // remove active class from any and all buttons
  allButtons.forEach((el) => el.classList.remove("active"));

  // add active classic to button that got clicked
  e.target.classList.add("active");

  // actualy filter the pets
  const currentFilter = e.target.dataset.filter;

  document.querySelectorAll(".pet-card").forEach((el) => {
    if (currentFilter == el.dataset.species || currentFilter == "all") {
      el.style.display = "grid";
    } else {
      el.style.display = "none";
    }
  });
}
