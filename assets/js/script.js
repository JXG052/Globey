let countryPage = false;

$("")

// Define variable to track the duplicate names if they are new users
let duplicateCounter = 1;
// Create an object that we save the user input and API responses in
const user = {
    userName : "",
    countriesVisited : [],
    flags : [],
    isNewUser : true,
};


// The function call the data saved in localStorage
function callSavedData(){
    $(".countries-visited-container").empty()
    let storedData = JSON.parse(localStorage.getItem(user.userName));
    console.log(storedData);
    if (storedData === null) {}
    else {
        // displayHistory(storedData.countriesVisited);
        displayHistory(storedData.flags);
    }
}


// The function display the national flag of the countries where the user visited
function displayHistory (array){
    $(".countries-visited-container").empty()
    array.forEach(function(element) {
        var img = $('<img />', {
            src: element,
            width: 75
        });
            let imgDiv = $(`<div>`);
            imgDiv.addClass("flag");
            let newDiv = imgDiv.append(img);
            $(".countries-visited-container").append(newDiv)
        })
}

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




$(function(){

    // Home Page
    if (!countryPage){
    let welcomeMessage = $(`<p class="speech-bubble-text">Hi User, I'm Globey, It's nice to meet you</p>`);
    $(".speech-bubble-container").append(welcomeMessage);
    $("#flag-container").empty()
    $(".btns-container").addClass("hide")
    $("#radio-div").addClass("hide")
    $("#search-form").addClass("hide");
    }

    // Get the name input from user
    $("#nameSubmit").on("click", function(event) {
        event.preventDefault();
        $("#search-form").removeClass("hide");
        let name = $("#userName").val().trim();
        console.log(name);
        const newUser = $("#newUser").is(":checked");
        const inputCheck = /^[0-9a-zA-Z]+$/;
        if (name.match(inputCheck)) {
            // Check if the user is already in the localStorage
            // if it is a new user with the same name ask to select another userName
            if (localStorage.getItem(name) !== null && newUser===true) {
                $("#duplicateName").modal({show: true});
            } else if (localStorage.getItem(name) === null && newUser===false) {
                $("#invalidCheckbox").modal({show: true});
            }
             else {
                user.userName = name;
                user.isNewUser = newUser;
                console.log(newUser);
                $("#userName").val("");
                $(".nameInput").addClass("hide");
                // retrieves saved values and displays them topleft
                callSavedData();
            }
        } else {
            $("#invalidName").modal({show: true});
        }

    })


    // Search
    $("#search-form").on("submit", function(event){
        event.preventDefault();
        countryPage = true;
        $(".countries-visited-container").addClass("hide")
        clear();
        let countryName = $("#search-input").val().trim()
        $("#search-input").val("")
        console.log(countryName);
        const countriesURL = `https://restcountries.com/v2/name/${countryName}`

        $.ajax({
            url: countriesURL,
            method: "GET",
            error: function (err) {
                displayErrorScreen();
            }
        }).then(function (response) {
            $("#globey").attr("src", "assets/images/Global Image.svg");
            const userCountry = response[0].name;
            user.countriesVisited.push(userCountry);
            welcomeMessage = (`<p class="speech-bubble-text">Welcome to ${response[0].name}`)
            $(".btns-container").removeClass("hide")
            $(".speech-bubble-container").append(welcomeMessage)
            $('#radio-div').removeClass("hide")
            $('#saveBtn').removeClass("hide")
            $('#saveBtn').text(`I've been to ${response[0].name} `)
            
            
            // Add Flag
            $("#flag-container").empty();
            let flag = $(`<img src="${response[0].flag}" class="flag">`)
            $("#flag-container").append(flag);
            let userFlag = response[0].flag;
            user.flags.push(userFlag);

            // Add functionality to buttons
            $(".btns-container").on("click", ".btn", function(event){
                event.preventDefault()
                let buttonClicked = event.target.innerHTML;
                showInfo(response, buttonClicked)
            } )

            // save data to localStorage
            $('#saveBtn').click(function(event){
                event.preventDefault();
                if (localStorage.getItem(user.userName) !== null && user.isNewUser === false) {
                    console.log("User already in localStorage");
                    const userData = JSON.parse(localStorage.getItem(user.userName));
                    console.log(userData);
                    if (userData.countriesVisited.includes(userCountry)) {}
                    else {userData.countriesVisited.push(userCountry);}
                    if (userData.flags.includes(userFlag)) {}
                    else {userData.flags.push(userFlag)}
                    localStorage.setItem(user.userName, JSON.stringify(userData));
                }
                else {
                    user.isNewUser = false;
                    localStorage.setItem(user.userName, JSON.stringify(user));
                    console.log("Saved to localStorage");
                }
                // retrieves saved values and displays them topleft
                callSavedData();
            })
            
    })
    })

    // Home Button
    $("#home-button").click(function(event){
        countryPage = false;
        $("#flag-container").empty()
        $(".btns-container").addClass("hide")
        $("#radio-div").addClass("hide")
        $(".countries-visited-container").removeClass("hide")
        $("#saveBtn").addClass("hide")
        $("#globey").attr("src", "assets/images/Global Image.svg")
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

function displayErrorScreen(){
    let errorMessage = $(`<p class="speech-bubble-text">Oh Oh! I don't think that's a country </p>`);
    $(".speech-bubble-container").append(errorMessage);
    $("#globey").attr("src", "assets/images/sad-globey.svg")
    $(".flag-container").empty()
    $(".btns-container").addClass("hide")
    $("#saveBtn").addClass("hide")

}
