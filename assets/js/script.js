// GLOBAL DATA
var summaryWeather = {
    date: "",
    weatherIcon: "",
    temperature: "",
    humidity: "",
    timeStamp = ""
}
var detailedWeather = {
    cityName: "",
    windSpeed: 0,
    uvIndex: 0,
    summaryWeather: {},
}
var searchHistoryList = ["Toronto"];

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
 */
function loadCityDataFromLocalDb() {}
/**
 * Function: isLocalDbStale
 * Description: Determine if weather data in local DB
 *  needs to be refreshed.
 */
function isLocalDbStale() {}

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
    // get today's weather
    var currentWeatherJson = retrieveCurrentWeather(defaultCity);
    extractCurrentWeatherData(currentWeatherJson);
    // render today's weather
    renderCurrentWeather();
    // get 5-day outlook
    var futureWeatherJson = retrieveFutureWeather(defaultCity);
    extractFutureWeatherData(futureWeatherJson);
    // render 5-day outlook
    renderFutureWeather();
    // add city to search history
    if (searchHistoryList.includes(defaultCity) === false) {
        searchHistoryList.push(defaultCity);
        renderHistoryList();
    }
}
// jQuery entry-point
$(document).ready(initApplication);