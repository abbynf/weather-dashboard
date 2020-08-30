var selectedCity;
var modifiedCity;
var todayForecastCity;
var enteredCity;
var long;
var latit;
var today = moment().format('L')





function callTodayForecast(cityInput){
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=d8733e2675e82a2b5d5803974ae39653",
    method: 'GET'
}).then(function(response){
    fillTodayForecast(response);
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
        fillFutureForecast(response);
    })
}

function fillFutureForecast(response){
    // first future forecast day
    $("#tomorrowDate").text(moment().add(1, 'days').format("MM/DD/YYYY"));
    var futIcon1 = response.daily[1].weather[0].icon
    var futIconUrl1 = "http://openweathermap.org/img/wn/" + futIcon1 +"@2x.png";
    $("#firstFutureIcon").attr("src", futIconUrl1);
    $("#firstFutureIcon").attr("alt", response.daily[1].weather[0].description)
    $("#tomorrow1Temp").text("Temp: " + tempConvert(response.daily[1].temp.day));
    $("#firstFutureHum").text("Humidity: " + response.daily[1].humidity + String.fromCharCode(37))

    // Second future forecast day
    $("#secondFutureDay").text(moment().add(2, 'days').format("MM/DD/YYYY"))
    var futIcon2 = response.daily[2].weather[0].icon
    var futIconUrl2 = "http://openweathermap.org/img/wn/" + futIcon2 +"@2x.png";
    $("#secondFutureIcon").attr("src", futIconUrl2);
    $("#secondFutureIcon").attr("alt", response.daily[2].weather[0].description)
    $("#secondFutureTemp").text("Temp: " + tempConvert(response.daily[2].temp.day));
    $("#secondFutureHum").text("Humidity: " + response.daily[2].humidity + String.fromCharCode(37));

    // Third future forecast day
    $("#thirdFutureDay").text(moment().add(3, 'days').format("MM/DD/YYYY"))
    var futIcon3 = response.daily[3].weather[0].icon
    var futIconUrl3 = "http://openweathermap.org/img/wn/" + futIcon3 +"@2x.png";
    $("#thirdFutureIcon").attr("src", futIconUrl3);
    $("#thirdFutureIcon").attr("alt", response.daily[3].weather[0].description)
    $("#thirdFutureTemp").text("Temp: " + tempConvert(response.daily[3].temp.day));
    $("#thirdFutureHum").text("Humidity: " + response.daily[3].humidity + String.fromCharCode(37));

    // Fourth future forecast day
    $("#fourthFutureDay").text(moment().add(4, 'days').format("MM/DD/YYYY"));
    var futIcon4 = response.daily[4].weather[0].icon
    var futIconUrl4 = "http://openweathermap.org/img/wn/" + futIcon4 +"@2x.png";
    $("#fourthFutureIcon").attr("src", futIconUrl4);
    $("#fourthFutureIcon").attr("alt", response.daily[4].weather[0].description)
    $("#fourthFutureTemp").text("Temp: " + tempConvert(response.daily[4].temp.day));
    $("#fourthFutureHum").text("Humidity: " + response.daily[4].humidity + String.fromCharCode(37));

    // Fifth future forecast day
    $("#fifthFutureDay").text(moment().add(5, 'days').format("MM/DD/YYYY"))
    var futIcon5 = response.daily[5].weather[0].icon;
    var futIconUrl5 = "http://openweathermap.org/img/wn/" + futIcon5 +"@2x.png";
    $("#fifthFutureIcon").attr("src", futIconUrl5);
    $("#fifthFutureIcon").attr("alt", response.daily[5].weather[0].description)
    $("#fifthFutureTemp").text("Temp: " + tempConvert(response.daily[5].temp.day));
    $("#fifthFutureHum").text("Humidity: " + response.daily[5].humidity + String.fromCharCode(37));
}


// event listener for the search button
$("#go").on("click", function(){
    callAPIs();
})

// event listener for the search history


function callAPIs(){
    enteredCity = $("#typedCity").val();
    var modifiedCity = "";
    for (i=0; i<enteredCity.length; i++){
        if (enteredCity[i] == " "){
            modifiedCity += "+"
        } else {
        modifiedCity += enteredCity[i] 
    }}
    saveCitySearch(enteredCity);
    callTodayForecast(modifiedCity);
    var newItem = $("<li>");
    newItem.text(enteredCity);
    $("ul").append(newItem)
    $(newItem).on('click', function(event){
        myFunction(event.currentTarget.innerHTML)
    })
    $("#displayCitySearched").text(enteredCity + " (" + today + ")");
}

function myFunction(input){
    var modifiedInput = "";
    for (i=0; i<input.length; i++){
        if (input[i] == " "){
            modifiedInput += "+"
        } else {
        modifiedInput += input[i] 
    }}
    callTodayForecast(modifiedInput);
    $("#displayCitySearched").text(input + " (" + today + ")");
}


function saveCitySearch(city){
    var newKey = moment().format("DDMMYYYYhmmss")
    localStorage.setItem(newKey, city)
}

function fillTodayForecast(response){

    $("#todayTemp").text("Temperature: " + tempConvert(response.main.temp));
    $("#todayHum").text("Humidity: " + response.main.humidity + String.fromCharCode(37))
    $("#todayWS").text("Wind speed: " + response.wind.speed + " MPH");
    latit = response.coord.lat;
    long = response.coord.lon;
    var newIcon = response.weather[0].icon;
    var newIconAddress = "http://openweathermap.org/img/wn/" + newIcon +"@2x.png"
    $("#todayIcon").attr("src", newIconAddress);
    callUVI();
    callFutureForecast();
}

function fillUVI(response){
    $("#todayUVIButton").text(response.value);
}

function tempConvert(K){
    var tempF = Math.round(((K - 273.15) * (9/5) + 32)*10) / 10;
    var tempFDegree = tempF + " F" + String.fromCharCode(176);
    return tempFDegree;
}