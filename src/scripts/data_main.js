import {getCountries, getStatesByCountry, 
    getCitiesByState, getStationInfo, 
    getStationsByCity} from './air_data';
import {getUrbanAreas} from './life_data';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export async function getCities() {
    console.log('fetching coutries')
    const countries = await getCountries(); //each element an object w/ key country
    console.log("got countries");
    await sleep(400);
    // debugger
    let citiesObjAr = []; //city rep eg {country: a, state: b, city: c, sation: ?}

    for (let i = 0; i < countries.length; i++) {
        // get states for each countries[i]
        const states = await getStatesByCountry(countries[i].country);
        await sleep(400);
        debugger
        //loop through states get cities > build urbanSpaceObj
        for (let j = 0; j < states.length; j++) {
            const cities = await getCitiesByState(states[j].state, countries[i].country);
            await sleep(400);
            // debugger
            //loop through cities and make obj
            for (let k = 0; k < cities.length; k++) {
                citiesObjAr.push({ country: countries[i].country, state: states[j].state, city: cities[k].city });
                console.log(citiesObjAr);
            }
        }
    }

    console.log(citiesObjAr);
    return citiesObjAr;
}

export async function getStations(cities) {
    const stations = []; //array of station objects
    for(let i = 0; i < cities.length; i++) {
        const stations = await getStationsByCity(cities[i].city, cities[i].state, cities[i].country);
        await sleep(400);

        for(let j = 0; j < stations.length; j++) {
            const stationName = stations[i].station;
            const stationInfo = await getStationInfo(stationName, cities[i].city, cities[i].state, cities[i].country);
            await sleep(400);
            stations.push(stationInfo);
            console.log(stations);
        }
    }

    console.log(stations);
    return stations;
}

export async function getAreas() {
    const urbanAreas = await getUrbanAreas();
    console.log(urbanAreas);
}

export async function getStationArray() {
    const airCities = await getCities();
    debugger
    const stations = await getStations(airCities);
    debugger
    return stations;
}



