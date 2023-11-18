async function fetchWeather(city) {
  const apiKey = '54019ef246bf83a6edea169080961980'; // Replace with your OpenWeatherMap API key

  // First, use the Geocoding API to get the coordinates
  const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
  if (!geoResponse.ok) {
    console.error('Failed to fetch geocoding data:', geoResponse.status, geoResponse.statusText);
    return null;
  }

  const geoData = await geoResponse.json();
  if (!geoData || geoData.length === 0) {
    console.error('Geocoding data is incomplete:', geoData);
    return null;
  }

  const { lat, lon } = geoData[0];

  // Then, use the coordinates to get the weather
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  if (!weatherResponse.ok) {
    console.error('Failed to fetch weather data:', weatherResponse.status, weatherResponse.statusText);
    return null;
  }

  const weatherData = await weatherResponse.json();
  if (!weatherData || !weatherData.weather || !weatherData.main) {
    console.error('Weather data is incomplete:', weatherData);
    return null;
  }

  return weatherData;
}

async function handleRequest(req) {
  const date = new Date();
  const winnipegTime = date.toLocaleTimeString("en-US", { timeZone: "America/Winnipeg" });
  const weatherData = await fetchWeather("Winnipeg");

  if (!weatherData) {
    const errorHTML = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Error</title>
          <style>
              /* Your CSS styles */
          </style>
      </head>
      <body>
          <h1>Error fetching weather data</h1>
      </body>
      </html>
    `;

    return new Response(errorHTML, {
      status: 500,
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    });
  }

  const weatherDescription = weatherData.weather[0].description;
  const temperature = weatherData.main.temp;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Weather in Winnipeg</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #282c34;
                color: white;
                text-align: center;
                padding-top: 50px;
            }
            .time, .weather {
                font-size: 6em;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Current Time and Weather in Winnipeg</h1>
        <div class="time">${winnipegTime}</div>
        <div class="weather">
            <p>Weather: ${weatherDescription}</p>
            <p>Temperature: ${temperature} °C</p>
        </div>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
    },
  });
}

Deno.serve({ port: 80 }, handleRequest);