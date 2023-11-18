import * as log from "https://deno.land/std@0.206.0/log/mod.ts";

interface Launch {
    flightNumber: number;
    mission: string;
}

const launches = new Map<number, Launch>();

await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("DEBUG"),
    },
    loggers: {
        default: {
            level: "INFO",
            handlers: ["console"],
        },
    }
});

async function DownloadLaunchData() {
    log.info("Downloading launch data...");
    const response = await fetch("https://api.spacexdata.com/v3/launches", {
        method: "GET",
    });

    if (!response.ok) {
        log.warning("Problem downloading launch data...");
        throw new Error("Launch data download failed.");
    }

    const launchData = await response.json();
    log.debug(`Received launch data: ${JSON.stringify(launchData)}`); // Log the raw response for verification

    for (const launch of launchData) {
        const flightData = {
            flightNumber: launch["flight_number"],
            mission: launch["mission_name"],
        };

        launches.set(flightData.flightNumber, flightData);
        log.info(`Flight Number: ${flightData.flightNumber}, Mission: ${flightData.mission}`);
    }
}

await DownloadLaunchData();