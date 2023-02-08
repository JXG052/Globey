// GEODB API




// const input = $("#search-input").val().trim()
// let cityName = formatCityName(input)


//  get lat and lon based on City

let cityName = "London"
const apiKey = "ab9f8caa2dd9cd7134acc296912c94ae"
const geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

$.ajax({
	url: geoCodeURL,
    method: "GET"
    }).then(function(response) {
		
        const weatherApiRootUrl = 'https://api.openweathermap.org';
        let lat = (response[0].lat);
        let lon = (response[0].lon);
		
        const weatherURL = weatherApiRootUrl + '/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + apiKey;
		// Settings for GEODB API
		
		
	})


    //     $.ajax({
    //         url: apiUrl,
    //         method: "GET"
    //     }).then(function(finalResponse) {
    //         let data = JSON.stringify(finalResponse)
    //         let toStore = {cityName, data}
    //         history.push(toStore)
            
    //         getWeather(finalResponse)
    //         localStorage.setItem("weatherHistory", JSON.stringify(history))
    //         addButton(cityName)

                
    //            // .dt_txt: "2023-02-11 12:00:00")
    //     })

    // })
    
