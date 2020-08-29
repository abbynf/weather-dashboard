console.log("hello")

var selectedCity;
var modifiedCity;
var todayForecastCity;
var todayForecastUrl;

function callTodayForecast(queryUrl){
$.ajax({
    url: queryUrl,
    method: 'GET'
}).then(function(response){
    console.log(response)
})}



// event listener for the search button
$("#go").on("click", callAPIs)


function callAPIs(){
    var enteredCity = $("#typedCity").val()
    var modifiedCity = "";
    for (i=0; i<enteredCity.length; i++){
        if (enteredCity[i] == " "){
            modifiedCity += "+"
        } else {
        modifiedCity += enteredCity[i] 
    }}
    console.log(modifiedCity)
    todayForecastCity = "q=" + modifiedCity;
    console.log(todayForecastCity)
    todayForecastUrl = "https://api.openweathermap.org/data/2.5/weather?" + todayForecastCity + "&appid=d8733e2675e82a2b5d5803974ae39653"
    console.log(todayForecastUrl);
    callTodayForecast(todayForecastUrl);
}