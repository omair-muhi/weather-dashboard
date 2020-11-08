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
// INIT FUNCTIONS
/**
 * Function: initApplication
 * Description: Entry-point for the weather-dashboard application
 */
function initApplication() {}
// jQuery entry-point
$(document).ready(initApplication);