async function start() {
  const weatherPromise = await fetch(
    "https://api.weather.gov/gridpoints/VEF/117,92/forecast"
  );
  const weatherData = await weatherPromise.json();

  const ourTemp = weatherData.properties.periods[0].temperature;

  document.querySelector("#temp-output").textContent = ourTemp;
}

start();
