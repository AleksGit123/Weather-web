let date = new Date();
let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
let day = date.toLocaleString('en-US', { weekday: 'short' });
let dateNumber = date.getDate();
// console.log(dateNumber)
let month = date.toLocaleString('en-US',{month: 'short'});
let exactDay = document.querySelectorAll(".exact_day");
let currentTime = document.querySelector(".current_time");
//get exact time
currentTime.innerHTML = time;



// get exact day
exactDay.forEach(element => {
    element.innerHTML = `${day}, ${dateNumber} ${month}`;
});

//	/forecast.json

//forecast according hour
// fetch(`http://api.weatherapi.com/v1/forecast.json?key=1f7e96cea97a4a288e3114533251805&q=Tbilisi`)
// .then(response =>{
//     return response.json()
// }).then(data =>{
//     console.log(data);
//     // console.log(data.forecast.forecastday[0].hour[0]["temp_c"])
    
//     for(let i = 0;i < data.forecast.forecastday[0].hour.length;i++){
//         console.log(`${i}: ${data.forecast.forecastday[0].hour[i]["temp_c"]}`);
//     }
// })



function getWeather(city){
    let currentTemperature = document.querySelector(".current_temp");
    let humidity = document.querySelector(".today_hum");
    let visibility = document.querySelector(".today_vis");
    let pressure = document.querySelector(".today_airpres")
    let wind = document.querySelector(".today_wind");
    let countryName = document.querySelectorAll(".country_name");

    fetch(`https://api.weatherapi.com/v1/current.json?key=954aba48f3e446a78f3114921251805&q=${city}`)
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        console.log(data);
        // console.log(data.location.country);
        currentTemperature.innerHTML = data.current.temp_c + "°C";
        humidity.innerHTML = data.current.humidity + "%";
        visibility.innerHTML = data.current["vis_km"] + "km";
        pressure.innerHTML = data.current["pressure_in"] + "mb"
        //
        wind.innerHTML = data.current["wind_kph"] + "kmh";
        countryName.forEach(element =>{
            element.innerHTML = `${data.location.name}, ${data.location.country}`
        })
        
    });
}
// getWeather("Tbilisi");


document.addEventListener("keypress", function(event){
  
    let input = document.querySelector(".country_search");
    if(event.key === "Enter"){
        getWeather(input.value);
    }
});