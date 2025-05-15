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
    let lat = data[0].lat
    let lon = data[0].lon;
    let countryCity = data[0]["display_name"];
    // console.log(countryCity)
    return {lat,lon,countryCity}
}

// console.log(lat,lon)



async function getWeather(country,city){
    let countryName = document.querySelectorAll(".country_name");
    let {lat,lon,countryCity} = await getLocation(country,city);
    console.log(countryCity)
    countryName.forEach(element =>{
        element.innerHTML = countryCity
    })

    fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=14a3bbe72b7647a9a20e971bd9ddc560&include=minutely`
    ).then(response =>{
        return response.json();
    }).then( data =>{
        console.log(data);        
    })
}

getWeather("Georgia","Tbilisi");
