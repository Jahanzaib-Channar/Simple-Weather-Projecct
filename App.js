
let searchbtn = document.querySelector(".search");
let city = document.querySelector(".search-inp");
let dateDay = document.querySelector(".date");

let locat = document.querySelector(".location-name");
let temperatue = document.querySelector(".Temp")
let unitTemp = document.querySelector(".unit")
let Humatidy = document.querySelectorAll(".humidity")
let WindSpeed = document.querySelectorAll(".windSpeed")
let feelTem = document.querySelectorAll(".feellike")
// let rainChance = document.querySelectorAll(".rainchance")





// search city

searchbtn.addEventListener("click", () => {

    let cityName = city.value

    if (cityName == "") {
        console.log("city not found")
        return
    }
    cityapi(cityName)

    city.value = ""
})

cityapi("Lahore");

// get city and checking cityy with help of API 
async function cityapi(cityName) {

    try {

        const cityurl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;

        let cityfetch = await fetch(cityurl)
        let geodata = await cityfetch.json();
        // console.log(geodata)

        let latitude = geodata.results[0].latitude
        let longitude = geodata.results[0].longitude
        let country = geodata.results[0].country
        let city = geodata.results[0].name

        // console.log(`${latitude} ..... ${longitude} ..... ${country}`)

        Weather(latitude, longitude, city, country);

    } catch (err) {
        console.log("error", err)
    }

}


// Geting weather condition according to city 

async function Weather(latitude, longitude, city, country) {
    try {

        // const url =
        //     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,precipitation,rain,weather_code&timezone=auto&hourly=&daily=sunrise,sunset`
        let weatherData = await fetch(url)

        let data = await weatherData.json()

        // console.log(data)


        // weather value
        let temp = data.current.temperature_2m
        let humitidy = data.current.relative_humidity_2m
        let wind = data.current.wind_speed_10m
        let feelTemp = data.current.apparent_temperature
        let rainchnce = data.current.rain

        // Weather unit
        let unit = data.current_units.temperature_2m
        let humitidyUnit = data.current_units.relative_humidity_2m
        let windsped = data.current_units.wind_speed_10m
        let feelTempUnit = data.current_units.apparent_temperature
        let rainChanceUnit = data.current_units.rain
        // 
        // 
        console.log(rainchnce ,rainChanceUnit )

        DataMapping(temp, unit, humitidy, humitidyUnit, wind, windsped, feelTemp, feelTempUnit, city, country)

    } catch (error) {
        console.log("error", error)
    }
}

/// Mapping Data

function DataMapping(temp, unit, humitidy, humitidyUnit, wind, windsped, feelTemp, feelTempUnit,rainchnce,rainChanceUnit, city, country) {

    // Get date day moth
    let getData = GetDate();
    dateDay.innerHTML = `${getData.day} , ${getData.localdate} ${getData.month}`

    // Location / city , country 

    locat.innerHTML = `${city} , ${country}`
    // Temperatue & unit 
    temperatue.innerHTML = temp
    unitTemp.innerHTML = unit

    // Humatidy & Unit 
    for (const element of Humatidy) {
        element.innerHTML = `${humitidy} ${humitidyUnit}`
    }

    // WindSpeed & unit 
    for (const element of WindSpeed) {
        element.innerHTML = `${wind} ${windsped}`
    }
    // Feel like temp

    for (const element of feelTem) {
        element.innerHTML = `${feelTemp} ${feelTempUnit}`
    }
    // for (const element of rainChance) {
    //     element.innerHTML = `${rainchnce} ${rainChanceUnit}`
    // }

}


// Get days 

function GetDate() {

    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = new Date()

    let localday = date.getDay()
    let localdate = date.getDate()
    let monthNum = date.getMonth()
    let month = months[monthNum]
    let day = days[localday]

    // console.log(day , localdate , month)
    return {
        localdate,
        month,
        day
    }

}
