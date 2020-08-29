console.log("hello")

var selectedCity;
var modifiedCity;
var todayForecastCity;
var todayForecastUrl;
var enteredCity;
var long;
var latit;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

today = mm+'/'+dd+'/'+yyyy;
console.log(today);

function callTodayForecast(cityInput){
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=d8733e2675e82a2b5d5803974ae39653",
    method: 'GET'
}).then(function(response){
    fillTodayForecast(response);
    console.log(response)
})}


function callUVI(){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=d8733e2675e82a2b5d5803974ae39653&lat=" + latit + "&lon=" + long,
        method: 'GET'
    }).then(function(response){
        fillUVI(response);
    })
}

function callFutureForecast(){
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/onecall?lat=" + latit + "&lon=" + long + "&appid=d8733e2675e82a2b5d5803974ae39653",
        method: 'GET'
    }).then(function(response){
        console.log(response);
    })
}

// event listener for the search button
$("#go").on("click", callAPIs)


function callAPIs(){
    enteredCity = $("#typedCity").val();
    var modifiedCity = "";
    for (i=0; i<enteredCity.length; i++){
        if (enteredCity[i] == " "){
            modifiedCity += "+"
        } else {
        modifiedCity += enteredCity[i] 
    }}
    callTodayForecast(modifiedCity);
}


function fillTodayForecast(response){
    $("#displayCitySearched").text(enteredCity + " " + today);
    var todayTempF = response.main.temp;
    var todayTempK = Math.round(((todayTempF - 273.15) * (9/5) + 32)*10) / 10;
    $("#todayTemp").text("Temperature: " + todayTempK + " F" + String.fromCharCode(176))
    console.log(response);
    $("#todayHum").text("Humidity: " + response.main.humidity + String.fromCharCode(37))
    $("#todayWS").text("Wind speed: " + response.wind.speed + " MPH");
    latit = response.coord.lat;
    long = response.coord.lon;
    callUVI();
    callFutureForecast();
}

function fillUVI(response){
    console.log(response);
    $("#todayUVIButton").text(response.value);
}

