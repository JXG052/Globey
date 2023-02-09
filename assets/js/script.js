// Rest Countries API

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




// Search
$("#search-form").on("submit", function (event) {
    event.preventDefault()
    clear()
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


})
$(document).ready(function () {
    $("#populationBtn").on("click", function (event) {
        // Prevent the default behavior
        event.preventDefault();

        // create user object from submission
        let userInput = [{
            name: $("#name-input").val(),
            country: $("#country-input").val(),
            newUser: $("#check").is(":checked"),
        }];

        // console.log("The value of userInput: " + JSON.stringify(userInput));
        // console.log("The value of user.name: " + userInput[0].name);
        // console.log("The value of user.country: " + userInput[0].country);
        // console.log("The value of user.visit: " + userInput[0].newUser);

        var userdata = JSON.parse(localStorage.getItem("userLog"));
        console.log("The value getting from localStorage: " + JSON.stringify(userdata));

        userdata.push(userInput[0]);
        localStorage.setItem("userLog", JSON.stringify(userdata));
        var userInf = JSON.parse(localStorage.getItem("userLog"));
        // userRecord = userInf;
        console.log("The value getting from localStorage after pushing: " + JSON.stringify(userInf));
        console.log("No. of Users: " + userInf.length);

    });
})

// Function to empty out the articles
function clear() {
    $("#speech-bubble").empty();
  }
