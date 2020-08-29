console.log("hello")

var selectedCity;
var modifiedCity;
var todayForecastCity;
var todayForecastUrl;
var enteredCity;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

today = mm+'/'+dd+'/'+yyyy;
console.log(today);

function callTodayForecast(queryUrl){
$.ajax({
    url: queryUrl,
    method: 'GET'
}).then(function(response){
    fillTodayForecast(response);
})}



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
    todayForecastCity = "q=" + modifiedCity;
    todayForecastUrl = "https://api.openweathermap.org/data/2.5/weather?" + todayForecastCity + "&appid=d8733e2675e82a2b5d5803974ae39653"
    callTodayForecast(todayForecastUrl);
}

function fillTodayForecast(response){
    $("#displayCitySearched").text(enteredCity + " " + today);
    var todayTempF = response.main.temp;
    var todayTempK = Math.round(((todayTempF - 273.15) * (9/5) + 32)*10) / 10;
    $("#todayTemp").text("Temperature: " + todayTempK + " F" + String.fromCharCode(176))
    console.log(response);
    $("#todayHum").text("Humidity: " + response.main.humidity + String.fromCharCode(37))
    $("#todayWS").text("Wind speed: " + response.wind.speed + " MPH");
}
