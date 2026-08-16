


const city = "Karachi"


const cityurl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

async function Weather() {

    try {

        let load = await fetch(cityurl);

        let geodata = await load.json();

        let latitude = geodata.results[0].latitude
        let longitude = geodata.results[0].longitude

        // const url =
        //     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;


        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

        let weatherData = await fetch(url);

        let data = await weatherData.json();

        console.log(data.current.temperature_2m)

    } catch (error) {

        console.log("error", error)
    }

}

Weather();