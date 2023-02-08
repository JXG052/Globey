// Rest Countries API

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
    
    let flag = $(`<img src="${response[0].flag}">`)
    let region = $(`<p class="info" id="region">Region: ${response[0].region}</p>`)
    let subRegion = $(`<p class="info" id="subregion">subregion: ${response[0].subregion}</p>`)
    let population = $(`<p class="info" id="population">Population: ${response[0].population}</p>`)
    let currency = $(`<p class="info" id="currency">Currency: ${response[0].currencies[0].name}</p>`)
    let nativeName = $(`<p class="info" id="nativeName">Native Name: ${response[0].nativeName}</p>`)
    let languageSpoken = $(`<p class="info" id="languageSpoken">Main Language: ${response[0].languages[0].name}</p>`)
    let capital = $(`<p class="info" id="capital">Capital: ${response[0].capital}</p>`)

    console.log(flag);
    $("#countryInfo").append([flag, region, subRegion, population, currency, nativeName, languageSpoken, capital])   
})

    

})

// Function to empty out the articles
function clear() {
    $("#countryInfo").empty();
  }



