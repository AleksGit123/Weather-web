"use strict";
"41.715137, 44.827095"
/* 
temp - current temperature,
wind_spd - wind speed
vis - visibility
rh - humidity
pres - air pressure
*/

async function getLocation(country,city){
    
    let response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json
`);
    let data = await response.json();
    // console.log(data);
    let lat = data[0].lat
    let lon = data[0].lon;
    let countryCity = data[0]["display_name"];
    // console.log(countryCity)
    return {lat,lon,countryCity}
}

// console.log(lat,lon)



async function getWeather(country,city){
    // variables
let {lat,lon,countryCity} = await getLocation(country,city);
    console.log(countryCity)
    let countryName = document.querySelectorAll(".country_name");
    let mainTemperature = document.querySelector(".current_temp");
    let humidity = document.querySelector(".today_hum");
    let visibility = document.querySelector(".today_vis");
    let airPressure = document.querySelector(".today_airpres");
    let windSpeed = document.querySelector(".today_wind");
    
    //get country and city names
    countryName.forEach(element =>{
        element.innerHTML = countryCity
    })

    //get main temperature
    

    fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=14a3bbe72b7647a9a20e971bd9ddc560&include=minutely`
    ).then(response =>{
        return response.json();
    }).then( data =>{
        // console.log(data);
        mainTemperature.innerHTML = data.data[0].temp + "°C";
        humidity.innerHTML = data.data[0].rh + "%";
        visibility.innerHTML = data.data[0].vis + "km";
        airPressure.innerHTML = data.data[0].pres + "hPa";
        windSpeed.innerHTML = data.data[0].wind_spd + "m/s";
    })

}

document.addEventListener("keypress", event =>{
    let input = document.querySelector(".country_search");
    let splitted_input = input.value.split(" ")
    if(event.key === "Enter"){
        console.log(input.value);
        console.log(splitted_input);
        getWeather(splitted_input[0],splitted_input[1]);
    }
})
getWeather("Georgia","Tbilisi");


