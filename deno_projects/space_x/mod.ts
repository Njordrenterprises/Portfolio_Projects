// import * as log from "https://deno.land/std/log/mod.ts";
// import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

// interface Launch {
//   flightNumber: number;
//   mission: string;
//   rocket: string;
//   customers: Array<string>;
// }

// const launches = new Map<number, Launch>();

// async function downloadLaunchData() {
//   log.info("Downloading launch data...");
//   const response = await fetch("https://api.spacexdata.com/v3/launches", {
//     method: "GET",
//   });

//   if (!response.ok) {
//     log.warning("Problem downloading launch data.");
//     throw new Error("Launch data download failed.");
//   }

//   const launchData = await response.json();
//   for (const launch of launchData) {
//     const payloads = launch["rocket"]["second_stage"]["payloads"];
//     const customers = _.flatMap(payloads, (payload: any) => {
//       return payload["customers"];
//     });

//     const flightData = {
//       flightNumber: launch["flight_number"],
//       mission: launch["mission_name"],
//       rocket: launch["rocket"]["rocket_name"],
//       customers: customers,
//     };

//     launches.set(flightData.flightNumber, flightData);

//     log.info(JSON.stringify(flightData));
//   }
// }

// if (import.meta.main) {
//   await downloadLaunchData();
//   log.info(JSON.stringify(import.meta));
//   log.info(`Downloaded data for ${launches.size} SpaceX launches.`);
// }

// Importing the entire 'log' module from Deno's standard library for logging purposes.
import * as log from "https://deno.land/std/log/mod.ts";

// Importing the lodash library for utility functions like flatMap.
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

// Defining an interface 'Launch' to structure the data for a space launch.
interface Launch {
  flightNumber: number; // Flight number, probably unique for each launch.
  mission: string;      // Name of the mission.
  rocket: string;       // Name of the rocket used.
  customers: Array<string>; // Array of customers involved in this launch.
}

// Creating a Map to store the launch data, keyed by flight number.
const launches = new Map<number, Launch>();

// Defining an asynchronous function to download and process launch data.
async function downloadLaunchData() {
  log.info("Downloading launch data..."); // Log message for start of download.

  // Fetching launch data from SpaceX's API.
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });

  // Check if the response is not OK, log a warning and throw an error.
  if (!response.ok) {
    log.warning("Problem downloading launch data.");
    throw new Error("Launch data download failed.");
  }

  // If response is OK, parse it as JSON.
  const launchData = await response.json();

  // Iterating over each launch item in the JSON data.
  for (const launch of launchData) {
    // Extracting payload data, which contains customer information.
    const payloads = launch["rocket"]["second_stage"]["payloads"];
    
    // Using lodash's flatMap to create an array of customers from the payloads.
    const customers = _.flatMap(payloads, (payload: any) => {
      return payload["customers"];
    });

    // Structuring the data for this launch.
    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers: customers,
    };

    // Adding the structured data to our launches Map.
    launches.set(flightData.flightNumber, flightData);

    // Logging the flight data as a string for debugging or information.
    log.info(JSON.stringify(flightData));
  }
}

// Checking if the module is the main program being run.
if (import.meta.main) {
  // If it is, call the function to download and process launch data.
  await downloadLaunchData();

  // Log the import.meta object for debugging.
  log.info(JSON.stringify(import.meta));

  // Log the total number of launches downloaded.
  log.info(`Downloaded data for ${launches.size} SpaceX launches.`);
}
