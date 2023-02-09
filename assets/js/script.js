var apiKey = "3102f3b643256623c7321b2ed4853779";    //API key

// Rest Countries API
let city = "London";
// Weather API
function getWeatherCondition() {

    // Constructing a URL to search for current weather data
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    // Performing AJAX GET request
    $("#today").empty();
    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            console.log(response);
            var imgIcon = $("<img>");
            // Store the code of weather icon in the iconUrl variable
            var iconUrl = response.weather[0].icon;
            imgIcon.attr("src", "http://openweathermap.org/img/wn/" + iconUrl + "@2x.png");
            // Add 'alt' attribute to <img> tag
            imgIcon.attr("alt", "Weather icon");

            var weather = $("<p>").text("Temp: " + response.weather.main + " ");

        })
}

getWeatherCondition()

// LEES SECTION
// if user is in local storage
// Then say welcome back UserName
// create user object
// If not say Hi
var nameList = [];
var userRecord = JSON.parse(localStorage.getItem("userLog"));
console.log("The value of userReCord: " + JSON.stringify(userRecord));

for (let i = 0; i < userRecord.length; i++) {
    nameList.push(userRecord[i].name);
}
console.log("A list of name: " + nameList);





// LEES SECTION
// if user is in local storage
// Then say welcome back UserName


// If not say Hi
const messages = ["Region: ", "Currency: ", "Native Name: ", "Main Language: ", "Capital: "];


// Search
$("#search-form").on("submit", function(event){
    event.preventDefault();
    clear();
    let countryName = $("#search-input").val().trim()
    const countriesURL = `https://restcountries.com/v2/name/${countryName}`

    $.ajax({
        url: countriesURL,
        method: "GET"
    }).then(function (response) {

        // Generate Flag
        let flag = $(`<img src="${response[0].flag}">`)


        // Imre's Section
        // Render Region + Region Button
        // if Region clicked 
        // Then display region message in bubble
        let region = $(`<p class="info" id="region">Region: ${response[0].region}</p>`)

        // Render Subregion & Subregion Button
        // if SubRegion clicked 
        // Then display Subregion message in bubble
        let subRegion = $(`<p class="info" id="subregion">subregion: ${response[0].subregion}</p>`)

        // Render Population & button

        // Add event listener to Population Button that
        // hide everything in speech bubble and show population message
        $("#populationBtn").click(function (event) {
            let populationMessage = $(`<p class="info" id="population">The Population in ${countryName} is ${response[0].population} people</p>`)
            $("#speech-bubble").append(populationMessage);
        })



        // Render Currency & button
        let currency = $(`<p class="info" id="currency">Currency: ${response[0].currencies[0].name}</p>`)

        // Render Native Name & button
        let nativeName = $(`<p class="info" id="nativeName">Native Name: ${response[0].nativeName}</p>`)

        // Render Languages Spoken & button
        let languageSpoken = $(`<p class="info" id="languageSpoken">Main Language: ${response[0].languages[0].name}</p>`)

        // Render Capital and Button
        let capital = $(`<p class="info" id="capital">Capital: ${response[0].capital}</p>`)

        // Get Random Fact

        // LEE'S SECTION
        // if checkoutBox === checked{
        // store name and variable 
        // Create data objects to store the 5-day weather data and the target weather data



    });

$.ajax({
    url: countriesURL,
    method: "GET"
}).then(function(response){

    console.log(response);
    
    // Generate Flag
    let flag = $(`<img src="${response[0].flag}">`)


    // Imre's Section
    // Render Region + Region Button
    // if Region clicked 
    // Then display region message in bubble
    $("#regionBtn").on("click", function(event) {
        event.preventDefault();
        clear();
        const region = response[0].subregion;;
        showInfo(messages[0] ,region);
    });

    // Event listener for population button
    $("#populationBtn").on("click", function(event){
        event.preventDefault();
        clear();
        const population = response[0].population;
        let populationMessage = "The Population is ";
        showInfo(populationMessage, population);
    })
    
 

    // Event listener for Currency button
    $("#currencyBtn").on("click", function(event) {
        event.preventDefault();
        clear();
        let currency = response[0].currencies[0].name;
        showInfo(messages[1], currency);
    })

    // Event listener for Native Name
    $("#nativeNameBtn").on("click", function(event) {
        event.preventDefault();
        clear();
        let nativeName = response[0].nativeName;
        showInfo(messages[2], nativeName);
    })

    // Render Languages Spoken & button
    $("#languageBtn").on("click", function(event) {
        event.preventDefault();
        clear();
        let languageSpoken = response[0].languages[0].name;
        showInfo(messages[3], languageSpoken);
    })

    // Render Capital and Button
    $("#capitalBtn").on("click", function(event) {
        event.preventDefault();
        clear();
        let capital = response[0].capital;
        showInfo(messages[4], capital);
    })

    // This is an event listener for the Weather button
    $("#weatherBtn").on("click", function() {
        event.preventDefault();
        clear();
        let capital = response[0].capital;

    })

    // Get Random Fact

    // LEE'S SECTION
    // if checkoutBox === checked{
    // store name and variable 
       

    })


    
})


// Function to empty out the articles
function clear() {
    $("#speech-bubble").empty();
  }

// Function to display the country info in the bubble
function showInfo(message, data) {
    clear();
    let info = $(`<p class="info" id="capital">${message+data}</p>`);
    $("#speech-bubble").append(info);
}

// Testing CSS
$("#sampleSpeechText")
