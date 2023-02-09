// Rest Countries API


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
    const countriesURL= `https://restcountries.com/v2/name/${countryName}`

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


