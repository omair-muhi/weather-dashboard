// GLOBAL DATA per API call
var currentWeather = {
    city: "",
    date: "",
    weatherIcon: "",
    temperature: "",
    humidity: "",
    windSpeed: ""
}

var futureWeather = {
    name: "",
    daysOutlook: []
}

// HANDLER FUNCTIONS
function searchButtonHandler(event) {
    var cityName = $("#city-search-text").val();
    //console.log("Getting weather for " + cityName);
    // getAndDisplayCityWeather(cityName);
    retrieveCurrentWeather(cityName);
    retrieveFutureWeather(cityName);
}

function searchHistoryButtonHandler(event) {
    var cityName = $(event.target).html();
    console.log("Getting weather for " + cityName);
    // getAndDisplayCityWeather(cityName);
}

// LOCAL-DB FUNCTIONS
/**
 * Function: saveCurrentWeatherDataToLocalDb
 * Description: Store today's weather data in local DB.
 */
function saveCurrentWeatherDataToLocalDb() {
    localStorage.setItem(currentWeather.city + "_curr", JSON.stringify(currentWeather))
}

function saveFutureWeatherDataToLocalDb() {
    localStorage.setItem(futureWeather.name + "_future", JSON.stringify(futureWeather));
}


/**
 * Function: loadCityDataFromLocalDb
 * Description: Load city weather data from local DB.
 * Parameters: cityString
 */
function loadWeatherDataFromLocalDb(cityString) {
    detailedWeather = JSON.parse(localStorage.getItem(cityString));
}
/**
 * Function: isFoundInLocalDb
 * Description: Determine if weather data exists in local DB
 * Parameters: cityString
 */
function isFoundInLocalDb(cityString) {
    if (localStorage.getItem(cityString) === null) {
        return false;
    } else {
        return true;
    }
}

// RENDER FUNCTIONS
/**
 * Function: renderHistoryList
 * Description: Populate search history in side bar
 */
function renderHistoryList() {}
/**
 * Function: renderCurrentWeather
 * Description: Populate BS card with today's weather
 */
function renderCurrentWeather() {
    $("#curr-city-date").text(currentWeather.city + " " + currentWeather.date);
    $("#curr-icon").attr("src", "http://openweathermap.org/img/wn/" + currentWeather.weatherIcon + "@2x.png");
    $("#curr-temp").text(currentWeather.temperature);
    $("#curr-humidity").text(currentWeather.humidity);
    $("#wind-speed").text(currentWeather.windSpeed);
}
/**
 * Function: renderFutureWeather
 * Description: Populate BS cards with 5-day outlook
 */
function renderFutureWeather() {
    for (var i = 0; i < 5; i++) {
        $("#day-" + i).text(futureWeather.daysOutlook[i].date);
        $("#day-" + i + "-icon").attr("src", "http://openweathermap.org/img/wn/" + futureWeather.daysOutlook[i].weatherIcon + "@2x.png");
        $("#day-" + i + "-temp").text(futureWeather.daysOutlook[i].temperature);
        $("#day-" + i + "-humidity").text(futureWeather.daysOutlook[i].humidity);
    }
}

// API FUNCTIONS ----------------
/**
 * Function: retrieveCurrentUVData
 * Description: Make an API call to get today's UV data
 * Parameters: 
 *  latitude
 *  longitude
 * Returns: JSON weather data
 */
function retrieveCurrentUVData(latitude, longitude) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=9c7e08eac863b63e5981dcd7c628c36f&units=metric";
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            $("#uv-index").text(jsonData.value);
            if (jsonData.value <= 3)
                $("#uv-index").addClass("badge-success");
            else if (jsonData.value > 3 && jsonData.value <= 6)
                $("#uv-index").addClass("badge-warning");
            else
                $("#uv-index").addClass("badge-danger");
        })
        .catch(function(error) {
            console.log(error);
        });
}

function convertToDateString(weatherDtProperty) {
    var millis = weatherDtProperty * 1000;
    var dateObject = new Date(millis);
    var dateString = dateObject.toLocaleString("en-US", { day: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { month: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { year: "numeric" });;
    return dateString;
}

/**
 * Function: extractCurrentWeatherData
 * Description: Extract weather data from JSON data
 * Parameters: jsonData - data returned by API call
 */
function extractCurrentWeatherData(jsonData) {
    currentWeather.city = jsonData.name;
    currentWeather.date = convertToDateString(jsonData.dt);
    currentWeather.weatherIcon = jsonData.weather[0].icon;
    currentWeather.temperature = jsonData.main.temp;
    currentWeather.humidity = jsonData.main.humidity;
    currentWeather.windSpeed = jsonData.wind.speed;
}
/**
 * Function: retrieveCurrentWeather
 * Description: Make an API call to get today's weather
 * Parameters: cityString - name of city
 * Returns: JSON weather data
 */
function retrieveCurrentWeather(cityString) {
    var requestUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + cityString + "&appid=9c7e08eac863b63e5981dcd7c628c36f&units=metric");
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            // populate detailedWeather objects
            extractCurrentWeatherData(jsonData);
            // add city to search history
            saveCurrentWeatherDataToLocalDb();
            // get the UV index
            retrieveCurrentUVData(jsonData.coord.lat, jsonData.coord.lon);
            // render today's weather
            renderCurrentWeather();
            // render new history list
            renderHistoryList();
        })
        .catch(function(error) {
            console.log(error);
        });
}
/**
 * Function: extractFutureWeatherData
 * Description: Extract future weather data from JSON data
 * Parameters: jsonData - data returned by API call
 */
function extractFutureWeatherData(jsonData) {
    for (var i = 0; i < 33; i += 8) {
        var futureWeatherObj = {};
        futureWeather.name = jsonData.city.name;
        futureWeatherObj.date = convertToDateString(jsonData.list[i].dt);
        futureWeatherObj.weatherIcon = jsonData.list[i].weather[0].icon;
        futureWeatherObj.temperature = jsonData.list[i].main.temp;
        // console.log(jsonData.list[i].main.temp);
        futureWeatherObj.humidity = jsonData.list[i].main.humidity;
        futureWeather.daysOutlook.push(futureWeatherObj);
    }
    // console.log(futureWeather);
}
/**
 * Function: retrieveFutureWeather
 * Description: Make an API call to get 5-day outlook
 * Parameters: cityString - name of city
 * Returns: JSON weather data
 */
function retrieveFutureWeather(cityString) {
    var requestUrl = ("https://api.openweathermap.org/data/2.5/forecast?q=" + cityString + "&appid=9c7e08eac863b63e5981dcd7c628c36f&units=metric");
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            // populate summaryWeather objects
            extractFutureWeatherData(jsonData);

            // add city to search history
            saveFutureWeatherDataToLocalDb();

            // render 5-day outlook
            renderFutureWeather();
        })
        .catch(function(error) {
            console.log(error);
        });
}

// MAIN
function getAndDisplayCityWeather(cityString) {
    if (isFoundInLocalDb(cityString)) {
        // populate summaryWeather and detailedWeather objects
        loadWeatherDataFromLocalDb(cityString);
    } else {
        // get today's weather using an API call
        retrieveCurrentWeather(cityString);
        // get 5-day outlook using an API call
        retrieveFutureWeather(cityString);
    }
}

// INIT FUNCTION
/**
 * Function: initApplication
 * Description: Entry-point for the weather-dashboard application
 */
function initApplication() {
    // clear local storage
    localStorage.clear();
    // clear main search bar
    $("#city-search-text").val("");
    // register event handlers
    $("#search-button").click(searchButtonHandler);
    $(".btn-group-vertical").click(searchHistoryButtonHandler);
    // default weather upon page refresh
    retrieveCurrentWeather("Toronto");
    retrieveFutureWeather("Toronto");
}
// jQuery entry-point
$(document).ready(initApplication);