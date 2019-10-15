//import quaity of life data by urban spaces 
// URL: https://developers.teleport.org/api/reference/#/
// GET ALL URBAN AREAS: GET /urban_areas/
// GET SCORES ON UA: GET /urban_areas/{ua_id}/scores/
// GET COORDS/ DETAILS: GET /urban_areas/{ua_id}/
import {makeRequest} from './xml';

export const getUrbanAreasXML = () => {
    makeRequest('GET', 'https://api.teleport.org/api/urban_areas/')
    .then(function (datums) {
        console.log(datums);
    })
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
    });
}

// export const getUrbanAreas = () => {
//     return fetch("https://api.teleport.org/api/urban_areas/").then(
//         res => res.json()
//     ).then(
//        data => {return data}
//     );
// }




