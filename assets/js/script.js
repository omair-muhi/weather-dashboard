// GLOBAL DATA
var summaryWeather = {
    date: "",
    weatherIcon: "",
    temperature: "",
    humidity: ""
}
var detailedWeather = {
    cityName: "",
    windSpeed: 0,
    uvIndex: 0,
    summaryWeather: {}
}

// HANDLER FUNCTIONS
function searchButtonHandler(event) {

}

function searchHistoryButtonHandler(event) {

}

// LOCAL-DB FUNCTIONS
/**
 * Function: saveCityDataToLocalDb
 * Description: Store city weather data in local DB.
 */
function saveCityDataToLocalDb() {}
/**
 * Function: loadCityDataFromLocalDb
 * Description: Load city weather data from local DB.
 * Parameters: cityString
 */
function loadCityDataFromLocalDb(cityString) {}
/**
 * Function: isFoundInLocalDb
 * Description: Determine if weather data exists in local DB
 * Parameters: cityString
 */
function isFoundInLocalDb(cityString) {}

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
function renderCurrentWeather() {}
/**
 * Function: renderFutureWeather
 * Description: Populate BS cards with 5-day outlook
 */
function renderFutureWeather() {}

// API FUNCTIONS
/**
 * Function: extractCurrentWeatherData
 * Description: Extract weather data from JSON data
 * Parameters: jsonData - data returned by API call
 */
function extractCurrentWeatherData(jsonData) {}
/**
 * Function: retrieveCurrentWeather
 * Description: Make an API call to get today's weather
 * Parameters: cityString - name of city
 * Returns: JSON weather data
 */
function retrieveCurrentWeather(cityString) {}
/**
 * Function: extractFutureWeatherData
 * Description: Extract future weather data from JSON data
 * Parameters: jsonData - data returned by API call
 */
function extractFutureWeatherData(jsonData) {}
/**
 * Function: retrieveFutureWeather
 * Description: Make an API call to get 5-day outlook
 * Parameters: cityString - name of city
 * Returns: JSON weather data
 */
function retrieveFutureWeather(cityString) {

}

// INIT FUNCTIONS
/**
 * Function: initApplication
 * Description: Entry-point for the weather-dashboard application
 */
function initApplication() {
    // display Toronto weather on page refresh
    var defaultCity = "Toronto";
    if (isFoundInLocalDb(defaultCity)) {
        // populate summaryWeather and detailedWeather objects
        loadCityDataFromLocalDb(defaultCity);
    } else {
        // get today's weather using an API call
        var currentWeatherJson = retrieveCurrentWeather(defaultCity);
        extractCurrentWeatherData(currentWeatherJson);
        // get 5-day outlook using an API call
        var futureWeatherJson = retrieveFutureWeather(defaultCity);
        extractFutureWeatherData(futureWeatherJson);
        // add city to search history
        saveCityDataToLocalDb();
        // render new history list
        renderHistoryList();
    }
    // render today's weather
    renderCurrentWeather();
    // render 5-day outlook
    renderFutureWeather();
}
// jQuery entry-point
$(document).ready(initApplication);