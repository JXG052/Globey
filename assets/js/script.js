// Rest Countries API


// LEES SECTION
// if user is in local storage
// Then say welcome back UserName


// If not say Hi



// Search
$("#search-form").on("submit", function(event){
    event.preventDefault()
    clear()
    let countryName = $("#search-input").val().trim()
    const countriesURL= `https://restcountries.com/v2/name/${countryName}`

$.ajax({
    url: countriesURL,
    method: "GET"
}).then(function(response){
    
    // Generate Flag
    let flag = $(`<img src="${response[0].flag}">`)


    // Imre's Section
    // Render Region + Region Button
    // if Region clicked 
    // Then display region message in bubble
    $("#regionBtn").on("click", function(event) {
        event.preventDefault();
        $("#speech-bubble").empty();
        let region = $(`<p class="info" id="region">Region: ${response[0].region}</p>`);
        let subRegion = $(`<p class="info" id="subregion">subregion: ${response[0].subregion}</p>`)
        $("#speech-bubble").append(region, subRegion);
    })

    // Render Subregion & Subregion Button
        // if SubRegion clicked 
        // Then display Subregion message in bubble

    // Render Population & button
    
    // Add event listener to Population Button that
        // hide everything in speech bubble and show population message
    $("#populationBtn").click(function(event){
        event.preventDefault();
        $("#speech-bubble").empty();
        let populationMessage = $(`<p class="info" id="population">The Population in ${countryName} is ${response[0].population} people</p>`)
        $("#speech-bubble").append(populationMessage);
    })
    
 

    // Render Currency & button
    $("#currencyBtn").on("click", function(event) {
        event.preventDefault();
        $("#speech-bubble").empty();
        let currency = $(`<p class="info" id="currency">Currency: ${response[0].currencies[0].name}</p>`);
        $("#speech-bubble").append(currency);
    })

    // Render Native Name & button
    let nativeName = $(`<p class="info" id="nativeName">Native Name: ${response[0].nativeName}</p>`)

    // Render Languages Spoken & button
    $("#languageBtn").on("click", function(event) {
        event.preventDefault();
        $("#speech-bubble").empty();
        let languageSpoken = $(`<p class="info" id="languageSpoken">Main Language: ${response[0].languages[0].name}</p>`);
        $("#speech-bubble").append(languageSpoken);
    })

    // Render Capital and Button
    $("#capitalBtn").on("click", function(event) {
        event.preventDefault();
        $("#speech-bubble").empty();
        let capital = $(`<p class="info" id="capital">Capital: ${response[0].capital}</p>`);
        $("#speech-bubble").append(capital);
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


