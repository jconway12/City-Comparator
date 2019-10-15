//import air_data (coordinates and city?)
// COUNTRIES: api.airvisual.com / v2 / countries ? key = {{ YOUR_API_KEY }}
// STATES: api.airvisual.com/v2/states?country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
// CITIES: api.airvisual.com/v2/cities?state={{STATE_NAME}}&country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
// LIST STATIONS IN CITY: api.airvisual.com/v2/stations?city={{CITY_NAME}}&state={{STATE_NAME}}&country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
// GET INFO ON STATIONS BY CITY: api.airvisual.com/v2/station?station={{STATION_NAME}}&city={{CITY_NAME}}&state={{STATE_NAME}}&country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
// GET NEAREST STATION DATA BY COORDS: api.airvisual.com/v2/nearest_station?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={2786cba9-7f59-49b7-b930-28902438e2df}
// more depending on need...
// Key: 2786cba9-7f59-49b7-b930-28902438e2df
import {makeRequest} from './xml';

export const getCountriesXML = () => {
    makeRequest('GET', `https://api.airvisual.com/v2/countries?key=2786cba9-7f59-49b7-b930-28902438e2df`)
        .then(function (datums) {
            console.log(datums);
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        });
}

export const getStatesXML = (country) => {
    makeRequest('GET', `https://api.airvisual.com/v2/states?country=${country}&key=2786cba9-7f59-49b7-b930-28902438e2df`)
        .then(function (datums) {
            console.log(datums);
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        });
}

export const getCitiesXML = (state, country) => {
    makeRequest('GET', `https://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=2786cba9-7f59-49b7-b930-28902438e2df`)
        .then(function (datums) {
            console.log(datums);
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        });
}

export const getStationsXML = (city, state, country) => {
    makeRequest('GET', `https://api.airvisual.com/v2/stations?city=${city}&state=${state}&country=${country}&key=2786cba9-7f59-49b7-b930-28902438e2df`)
        .then(function (datums) {
            console.log(datums);
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        });
}

export const getStationInfoXML = (station, city, state, country) => {
    makeRequest('GET', `https://api.airvisual.com/v2/station?station=${station}&city=${city}&state=${state}&country=${country}&key=2786cba9-7f59-49b7-b930-28902438e2df`)
        .then(function (datums) {
            console.log(datums);
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        });
}


// export const getCountries = () => {
//     return fetch(`https://cors-anywhere.herokuapp.com/https://api.airvisual.com/v2/countries?key=2786cba9-7f59-49b7-b930-28902438e2df`).then(
//         res => res.json()
//     ).then(
//         data => console.log(data)
//     );
// }

// export const getStatesByCountry = (country) => {
//     return fetch(`https://cors-anywhere.herokuapp.com/https://api.airvisual.com/v2/states?country=${country}&key=2786cba9-7f59-49b7-b930-28902438e2df`).then(
//         res => res.json()
//     ).then(
//         data => { return data.data }
//     );
// }

// export const getCitiesByState = (state, country) => {
//     return fetch(`https://cors-anywhere.herokuapp.com/https://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=2786cba9-7f59-49b7-b930-28902438e2df`).then(
//         res => res.json()
//     ).then(
//         data => { return data.data }
//     );
// }

// export const getStationsByCity = (city, state, country) => {
//     return fetch(`https://cors-anywhere.herokuapp.com/https://api.airvisual.com/v2/stations?city=${city}&state=${state}&country=${country}&key=2786cba9-7f59-49b7-b930-28902438e2df`).then(
//         res => res.json()
//     ).then(
//         data => { return data.data }
//     );
// }

// export const getStationInfo = (station, city, state, country) => {
//     return fetch(`https://cors-anywhere.herokuapp.com/https://api.airvisual.com/v2/station?station=${station}&city=${city}&state=${state}&country=${country}&key=2786cba9-7f59-49b7-b930-28902438e2df`).then(
//         res => res.json()
//     ).then(
//         data => { return data.data }
//     );
// }