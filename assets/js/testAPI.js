// GEODB API




// const input = $("#search-input").val().trim()
// let cityName = formatCityName(input)


//  get lat and lon based on City

let cityName = "Paris"
const apiKey = "ab9f8caa2dd9cd7134acc296912c94ae"
const geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

$.ajax({
	url: geoCodeURL,
    method: "GET"
    }).then(function(response) {
		
        const weatherApiRootUrl = 'https://api.openweathermap.org';
        let lat = (response[0].lat);
        let lon = (response[0].lon);
		let coordinates = ""
		if (lat >= 0 && lon >= 0){
			coordinates = "%2B" + lat + "%2B" + lon;
		}
		else if (lat >= 0 && lon < 0){
			coordinates = "%2B" + lat + lon
		}
		else if (lat < 0 && lon >= 0){
			coordinates = lat + "%2B" + lon
		}
		else {
			coordinates = lat + lon
		}
		
		console.log(coordinates);
        const weatherURL = weatherApiRootUrl + '/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + apiKey;
		// Settings for GEODB API
		const settings = {
			"async": true,
			"crossDomain": true,
			"url": `https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?location=${coordinates}`,
			"method": "GET",
			"headers": {
				"X-RapidAPI-Key": "a2e43aba5cmshc0de1efea17429ep17a7e4jsnd7ce2248cd04",
				"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
			}
		};
		
		$.ajax(settings).done(function (response) {
			console.log(response.data[0]);
		});
		
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
    
