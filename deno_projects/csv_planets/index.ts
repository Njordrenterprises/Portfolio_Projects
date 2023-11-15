import { join } from "https://deno.land/std@0.202.0/path/mod.ts";
import { parse } from "https://deno.land/std@0.202.0/csv/mod.ts";
import { pick } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Planet { 
    [ key : string ] : string 
}
async function loadPlanetDataPeriods() {
  const path = join(".", "kepler_exoplanets_nasa.csv");
  const file = await Deno.open(path);
  const result = await parse(await Deno.readTextFile(path), {
    skipFirstRow: true,
    comment: "#",
  });

  Deno.close(file.rid);

  const planets = (result as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number (planet ["koi_smass"]);
    const stellarRadius = Number (planet["koi_srad"]);

    return planet ["koi_disposition"] === "CONFIRMED"
    && planetaryRadius > 0.5 && planetaryRadius < 1.5
    && stellarMass > 0.78 && stellarMass < 1.04
    && stellarRadius > 0.99 && stellarRadius < 1.01;
  });

//   console.log(result);
  return planets; // return the entire array of planet objects
}
//laod planet data
const newEarths = await loadPlanetDataPeriods();

//extract orbital periods from the planet data
const orbitalPeriods = newEarths.map(planet => Number(planet["koi_period"]));

//calculate the min and max of orbital periods
const minPeriods = Math.min(...orbitalPeriods);
const maxPeriods = Math.max(...orbitalPeriods);

//log the results
console.log(`${newEarths.length} habitable planets found!`);
console.log(`${minPeriods} days was the shortest orbit period found`);
console.log(`${maxPeriods} days was the longest orbital period found`);

//iterate over each planet and log its details
newEarths.forEach((planet) => {
    const planetData = `KOI Name: ${planet["kepoi_name"]}, Kepler Name: ${planet["kepler_name"] || 'N/A'}`;
    console.log (planetData);
});