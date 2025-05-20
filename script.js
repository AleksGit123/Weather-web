"use strict";
let date = new Date();
let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
let day = date.toLocaleString('en-US', { weekday: 'short' });
let dateNumber = date.getDate();
let month = date.toLocaleString('en-US',{month: 'short'});
let exactDay = document.querySelectorAll(".exact_day");
let currentTime = document.querySelector(".current_time");

// buttons and sections
let tomorrowDay = document.querySelector(".tomorrow_exact_day")
let tomorrowTemp = document.querySelector(".tomorrow_temp");
let todaySection = document.querySelector(".today");
let tomorrowSection = document.querySelector(".tomorrow");
let todayBtn = document.querySelectorAll(".current");
let tomorrowBtn = document.querySelectorAll(".tmrr");

// burger menu
let burgerMenu = document.querySelector(".burger_menu");
let dropdownLIst = document.querySelector(".dropdown_list");

// hide dropdown list default
function handleResponsiveMenu() {
    if (window.innerWidth > 900) {
        dropdownLIst.classList.add("hide");
    }
}

// Call the function on page load
handleResponsiveMenu();


// Add event listener for window resize
window.addEventListener("resize", handleResponsiveMenu);

burgerMenu.addEventListener("click",()=>{
    if(dropdownLIst.classList.contains("hide")){
        dropdownLIst.classList.remove("hide");
    }
    else{
        dropdownLIst.classList.add("hide");
    }
})


// tomorrow date
let tomorrowDate = new Date();
tomorrowDate.setDate(date.getDate() + 1);

let getTomorrowWeather = name =>{

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=eb5d012136bc4544a56214539251905&q=${name}&days=2`)
    .then(response => response.json())
    .then(data => {
      let tomorrow = data.forecast.forecastday[1]; // index 1 = tomorrow
      console.log(data)
  
      // display temperature and day 
      tomorrowTemp.innerHTML = tomorrow.day.avgtemp_c + "°C";
      tomorrowDay.innerHTML =
        tomorrowDate.toLocaleString('en-US', { weekday: 'short' }) + ", " +
        tomorrowDate.toLocaleString('en-US', { month: 'short' }) + " " +
        tomorrowDate.getDate();
    })
}


//get exact time
currentTime.innerHTML = time;


todaySection.style.transition = "transform .5s"
tomorrowSection.style.transition = "all .5s"


// main temperature sections' scroll events

todayBtn.forEach(element => {
    element.addEventListener("click",()=>{
        todaySection.style.transform = "translateX(0)";
        tomorrowSection.style.left = "88%";
    })    
});



tomorrowBtn.forEach(element =>{
    element.addEventListener("click",()=>{
        tomorrowSection.style.left = "25%";
        todaySection.style.transform = "translateX(-122%)";
    })
})




// get exact day
exactDay.forEach(element => {
    element.innerHTML = `${day}, ${dateNumber} ${month}`;
});


// current weather

function getWeather(city){
    let currentTemperature = document.querySelector(".current_temp");
    let humidity = document.querySelector(".today_hum");
    let visibility = document.querySelector(".today_vis");
    let pressure = document.querySelector(".today_airpres")
    let wind = document.querySelector(".today_wind");
    let countryName = document.querySelectorAll(".country_name");

    fetch(`https://api.weatherapi.com/v1/current.json?key=eb5d012136bc4544a56214539251905&q=${city}`)
    .then(response =>{
        return response.json()
    })
    .then(data =>{

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

let tempAccordingTime = async name =>{

    let timeForWeather = document.querySelectorAll(".time");
    let weatherIcons = document.querySelectorAll(".weather_icon"); 
    let temp = document.querySelectorAll(".degree");
    
   
 
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=eb5d012136bc4544a56214539251905&q=${name}`).then(request =>{
        return request.json()
    }).then(data => {
        // console.log(data)
        let hoursAndTemp = data.forecast.forecastday[0].hour;
       
        timeForWeather.forEach((element,index) => {
            // console.log(index);
            element.innerHTML = hoursAndTemp[index].time.slice(11,16);
       });
    
       weatherIcons.forEach((element,index) => {
            // console.log(index);
            element.src = "https:" + hoursAndTemp[index].condition.icon;
       });

       temp.forEach((element,index) => {
            // console.log(index);
            element.innerHTML = hoursAndTemp[index].temp_c + "°C";
       });
    })
}


document.addEventListener("keypress", function(event){
  
    let input = document.querySelector(".country_search");
    if(event.key === "Enter"){
        getWeather(input.value);
        tempAccordingTime(input.value);
        getTomorrowWeather(input.value);

    }
});


