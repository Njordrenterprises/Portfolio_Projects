// Importing necessary modules from Deno's standard library and from an external CSV parser
import { join } from "https://deno.land/std@0.202.0/path/mod.ts"; // Used for joining paths
import { parse } from "https://deno.land/std@0.202.0/csv/mod.ts"; // Used to read and parse CSV files

// Creating an interface to represent a planet.
// This lets us work with planet data flexibly, as we don't define specific fields.
interface Planet { 
    [key: string]: string; // Key-value pairs, both keys and values are strings
}

// Declaring an asynchronous function to load and process planet data.
async function loadPlanetDataPeriods() {
  // Constructing the path to the CSV file.
  const path = join(".", "kepler_exoplanets_nasa.csv"); // '.' means current directory

  // Opening the CSV file.
  const file = await Deno.open(path); // Async call to open the file

  // Reading and parsing the CSV file.
  const result = await parse(await Deno.readTextFile(path), {
    skipFirstRow: true, // We skip the first row (usually headers)
    comment: "#", // Lines starting with '#' are treated as comments and ignored
  });

  // Closing the file after reading it.
  Deno.close(file.rid); // Always close the file after you're done to avoid locking it

  // Filtering the planet data based on certain criteria.
  const planets = (result as Array<Planet>).filter((planet) => {
    // Converting string values to numbers for comparison
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    // Returning only planets that meet all these conditions
    return planet["koi_disposition"] === "CONFIRMED"
      && planetaryRadius > 0.5 && planetaryRadius < 1.5
      && stellarMass > 0.78 && stellarMass < 1.04
      && stellarRadius > 0.99 && stellarRadius < 1.01;
  });

  // Returning the filtered planets
  return planets;
}

// Loading the planet data and storing it in 'newEarths'
const newEarths = await loadPlanetDataPeriods();

// Extracting the orbital periods of each planet and converting them to numbers
const orbitalPeriods = newEarths.map(planet => Number(planet["koi_period"]));

// Finding the shortest and longest orbital periods from the array
const minPeriods = Math.min(...orbitalPeriods); // Spread operator '...' to pass all elements as arguments
const maxPeriods = Math.max(...orbitalPeriods);

// Logging the number of habitable planets found and the min/max orbital periods
console.log(`${newEarths.length} habitable planets found!`);
console.log(`${minPeriods} days was the shortest orbit period found`);
console.log(`${maxPeriods} days was the longest orbital period found`);

// Iterating over each planet and logging its KOI Name and Kepler Name
newEarths.forEach((planet) => {
    // Constructing a string with the planet's details and logging it
    // If 'kepler_name' is missing, 'N/A' is printed instead
    const planetData = `KOI Name: ${planet["kepoi_name"]}, Kepler Name: ${planet["kepler_name"] || 'N/A'}`;
    console.log(planetData);
});
