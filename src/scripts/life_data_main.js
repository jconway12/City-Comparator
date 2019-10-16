import { getUrbanAreasXML } from './life_data';
import {makeRequest} from './xml';

export async function getAreas() {
    const urbanAreas = await getUrbanAreasXML();
    const urbanAreasObj = JSON.parse(urbanAreas);
    // console.log(urbanAreasObj["_links"]["ua:item"]);

    const arr = urbanAreasObj["_links"]["ua:item"]; //each obj in this array has href and name (city name)
    const urbanAreaData = [];

    for(let i = 0; i < arr.length; i++) {
        const name = arr[i].name;
        const url = arr[i].href;
        const response = await makeRequest('GET', url)
            .then(function (datums) {
                return datums;
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            });
            // debugger
        const url2 = JSON.parse(response)["_links"]["ua:scores"]["href"];
        const scoreResponse = await makeRequest('GET', url2)
            .then(function (datums) {
                return datums;
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            });
        const scoresArr = JSON.parse(scoreResponse)["categories"];
         
        const areaObj = { name, scoresArr };
        urbanAreaData.push(areaObj);
    }

    // console.log(urbanAreaData);
    return urbanAreaData;
 }
