let countryPage = false;
// logs weather response based on city parameter
function getWeatherCondition(city) {
    
    const weatherApiKey = "3102f3b643256623c7321b2ed4853779"
    // Constructing a URL to search for current weather data
    const queryURLCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`
    // API Key for Open Weather API

    // Performing AJAX GET request
                            // $("#today").empty(); -- What is this doing?
    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            clear()
            let info = $(`<p class="speech-bubble-text">The Weather in ${city} is ${response.weather[0].description}!</p>`);
            $(".speech-bubble-container").append(info);
        })
        
}







// Storage 
// var nameList = [];
// var userRecord = JSON.parse(localStorage.getItem("userLog"));
// console.log("The value of userReCord: " + JSON.stringify(userRecord));

// for (let i = 0; i < userRecord.length; i++) {
//     nameList.push(userRecord[i].name);
// }
// console.log("A list of name: " + nameList);


// If not say Hi
// const messages = ["Region: ", "Currency: ", "Native Name: ", "Main Language: ", "Capital: "];

$(function(){
    if (!countryPage){
    let welcomeMessage = $(`<p class="speech-bubble-text">Hi User, I'm Globey, It's nice to meet you</p>`);
    $(".speech-bubble-container").append(welcomeMessage);
    $("#flag-container").empty()
    $(".btns-container").addClass("hide")
    }


    // Search
    $("#search-form").on("submit", function(event){
        event.preventDefault();
        countryPage = true;
        clear();
        let countryName = $("#search-input").val().trim()
        console.log(countryName);
        const countriesURL = `https://restcountries.com/v2/name/${countryName}`

        $.ajax({
            url: countriesURL,
            method: "GET"
        }).then(function (response) {
            welcomeMessage = (`<p class="speech-bubble-text">Welcome to ${response[0].name}`)
            $(".btns-container").removeClass("hide")
            $(".speech-bubble-container").append(welcomeMessage)
            $('#radio-label').text(`I've been to ${response[0].name} `)
            

            // Add Flag
            $("#flag-container").empty();
            let flag = $(`<img src="${response[0].flag}" class="flag">`)
            $("#flag-container").append(flag)


            $(".btns-container").on("click", ".btn", function(event){
                event.preventDefault()
                let buttonClicked = event.target.innerHTML;
                showInfo(response, buttonClicked)
            } )

    })
    })

    // Home Button
    $("#home-button").click(function(event){
        countryPage = false;
        $("#flag-container").empty()
        $(".btns-container").addClass("hide")
        clear()
        let welcomeMessage = $(`<p class="speech-bubble-text">Hi User, Welcome back to the home page</p>`);
        $(".speech-bubble-container").append(welcomeMessage);

    })
})



// Function to empty out the speechbubble
function clear() {
    $(".speech-bubble-container").empty();
  }

// // Function to display the country info in the bubble
function showInfo(response, buttonClicked) {
    clear();
    let info;
    switch (buttonClicked){
        case 'Population':
            info = $(`<p class="speech-bubble-text">${response[0].name} has a population of ${response[0].population} people!</p>`);
            $(".speech-bubble-container").append(info);
            break;
        case 'Weather':
            getWeatherCondition(response[0].capital)
            console.log(response[0].capital);
            break;
        case 'Capital':
            info = $(`<p class="speech-bubble-text">The capital of ${response[0].name} is ${response[0].capital}!</p>`);
            $(".speech-bubble-container").append(info);
            break;
        case 'Currency':
            info = $(`<p class="speech-bubble-text">In ${response[0].name}, the local currency is ${response[0].currencies[0].name}, ${response[0].currencies[0].symbol}!</p>`)
            $(".speech-bubble-container").append(info);
            break;
        case 'Language':
            info =  $(`<p class="speech-bubble-text">In ${response[0].name}, they speak ${response[0].languages[0].name}!</p>`);
            $(".speech-bubble-container").append(info);
            break;
        case 'Region':
            info = $(`<p class="speech-bubble-text">In case you weren't sure, ${response[0].name} is located in ${response[0].subregion}!</p>`);
            $(".speech-bubble-container").append(info);
            break;
    }
    
    
}

